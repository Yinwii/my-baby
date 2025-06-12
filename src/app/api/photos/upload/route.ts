import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'; // Not used in this backend upload flow
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames
import sharp from 'sharp';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os'; // For temporary file paths

// Initialize S3 client for R2
// We will read these from environment variables
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN!; // e.g. https://pub-xxxxxxxx.r2.dev or your custom domain

const s3Client = new S3Client({
  region: 'auto', // R2 specific value
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// Helper function to run FFmpeg commands
async function runFFmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg'; // Allow overriding ffmpeg path
    const ffmpeg = spawn(ffmpegPath, args, { stdio: 'pipe' });
    let stderr = '';
    ffmpeg.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.error(`FFmpeg exited with code ${code}: ${stderr}`);
        reject(new Error(`FFmpeg error: ${stderr.trim().split('\n').pop() || 'Unknown FFmpeg error'}`));
      }
    });
    ffmpeg.on('error', (err) => {
      console.error('Failed to start FFmpeg:', err);
      reject(err);
    });
  });
}

// Helper function to get FFprobe data
async function getFFprobeData(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const ffprobePath = process.env.FFPROBE_PATH || 'ffprobe'; // Allow overriding ffprobe path
    const args = [
      '-v', 'quiet',
      '-print_format', 'json',
      '-show_format',
      '-show_streams',
      filePath
    ];
    const ffprobe = spawn(ffprobePath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '';
    let stderr = '';
    ffprobe.stdout.on('data', (data) => (output += data.toString()));
    ffprobe.stderr.on('data', (data) => (stderr += data.toString()));
    ffprobe.on('close', (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(output));
        } catch (e) {
          console.error('Failed to parse ffprobe output:', output);
          reject(new Error('Failed to parse ffprobe output.'));
        }
      } else {
        console.error(`FFprobe exited with code ${code}: ${stderr}`);
        reject(new Error(`FFprobe error: ${stderr.trim().split('\n').pop() || 'Unknown FFprobe error'}`));
      }
    });
    ffprobe.on('error', (err) => {
      console.error('Failed to start FFprobe:', err);
      reject(err);
    });
  });
}

export async function POST(request: NextRequest) {
  let tempDir: string | null = null; // For cleaning up temporary directory
  try {
    // Check if environment variables are set
    if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_ACCOUNT_ID || !R2_PUBLIC_DOMAIN) {
      console.error('R2 environment variables are not properly configured.');
      return NextResponse.json({ error: 'Server configuration error for file uploads.' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    // You can also get other metadata fields here if sent from frontend
    // const title = formData.get('title') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    let determinedMediaType: 'IMAGE' | 'VIDEO' | 'UNSUPPORTED' = 'UNSUPPORTED';
    if (file.type.startsWith('image/')) {
      determinedMediaType = 'IMAGE';
    } else if (file.type.startsWith('video/')) {
      determinedMediaType = 'VIDEO';
    } else {
      return NextResponse.json({ error: `Unsupported file type: ${file.type}.` }, { status: 415 });
    }

    let processedFileBuffer: Buffer;
    let finalFileName: string;
    let finalContentType: string;
    const originalFormat = file.name.split('.').pop()?.toLowerCase();
    let convertedFormat: string | undefined = originalFormat;
    let videoDuration: number | null = null;
    let uploadedThumbnailUrl: string | null = null;
    const baseUniqueName = uuidv4(); // Used for main file and thumbnail to link them

    if (determinedMediaType === 'IMAGE') {
      const imageBuffer = Buffer.from(await file.arrayBuffer());
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        console.log(`Converting HEIC/HEIF image: ${file.name}`);
        processedFileBuffer = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();
        convertedFormat = 'jpeg';
        finalFileName = `${baseUniqueName}.${convertedFormat}`;
        finalContentType = 'image/jpeg';
      } else if (['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        console.log(`Using original image: ${file.name} of type ${file.type}`);
        processedFileBuffer = imageBuffer;
        finalFileName = `${baseUniqueName}.${originalFormat}`; // Use baseUniqueName
        finalContentType = file.type;
        // convertedFormat remains originalFormat
      } else {
        console.warn(`Potentially unsupported image type ${file.type}, attempting to process with Sharp as JPEG.`);
        try {
            processedFileBuffer = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();
            convertedFormat = 'jpeg';
            finalFileName = `${baseUniqueName}.${convertedFormat}`; // Use baseUniqueName
            finalContentType = 'image/jpeg';
        } catch (sharpError) {
            console.error('Error processing image with Sharp:', sharpError);
            return NextResponse.json({ error: `Unsupported image type: ${file.type}. Could not process.` }, { status: 415 });
        }
      }
    } else if (determinedMediaType === 'VIDEO') {
      const videoBuffer = Buffer.from(await file.arrayBuffer());
      tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'media-upload-'));

      // Sanitize file.name for use as a file path component
      const safeOriginalFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const tempInputPath = path.join(tempDir, safeOriginalFileName);

      const outputMp4Path = path.join(tempDir, `${baseUniqueName}.mp4`);
      const outputThumbnailPath = path.join(tempDir, `${baseUniqueName}_thumb.jpg`);

      try {
        await fs.writeFile(tempInputPath, videoBuffer);

        console.log(`Converting video ${file.name} to MP4...`);
        await runFFmpeg(['-i', tempInputPath, '-vcodec', 'libx264', '-acodec', 'aac', '-movflags', '+faststart', '-preset', 'medium', '-profile:v', 'main', '-level', '3.1', '-crf', '23', outputMp4Path]);
        processedFileBuffer = await fs.readFile(outputMp4Path);
        convertedFormat = 'mp4';
        finalFileName = `${baseUniqueName}.mp4`;
        finalContentType = 'video/mp4';

        console.log(`Generating thumbnail for ${finalFileName}...`);
        await runFFmpeg(['-i', outputMp4Path, '-ss', '00:00:01.000', '-vframes', '1', '-vf', 'scale=320:-1', outputThumbnailPath]);
        const thumbnailBuffer = await fs.readFile(outputThumbnailPath);
        const thumbnailR2Key = `thumbnails/${baseUniqueName}_thumb.jpg`;

        console.log(`Uploading thumbnail to R2: ${thumbnailR2Key}`);
        await s3Client.send(new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: thumbnailR2Key,
          Body: thumbnailBuffer,
          ContentType: 'image/jpeg',
          ACL: 'public-read',
        }));
        uploadedThumbnailUrl = `${R2_PUBLIC_DOMAIN.replace(/\/$/, '')}/${thumbnailR2Key}`;

        console.log(`Getting video duration for ${finalFileName}...`);
        const probeData = await getFFprobeData(outputMp4Path);
        if (probeData.format && probeData.format.duration) {
          videoDuration = Math.round(parseFloat(probeData.format.duration));
        } else if (probeData.streams && probeData.streams.length > 0) {
          const videoStream = probeData.streams.find((s: any) => s.codec_type === 'video');
          if (videoStream && videoStream.duration) {
            videoDuration = Math.round(parseFloat(videoStream.duration));
          }
        }
        console.log(`Video duration: ${videoDuration}s`);

      } catch (processingError) {
        console.error('Video processing error:', processingError);
        const errorMessage = processingError instanceof Error ? processingError.message : 'Unknown video processing error.';
        return NextResponse.json({ error: 'Failed to process video.', details: errorMessage }, { status: 500 });
      }
      // Note: Temporary directory cleanup is handled in the finally block outside this try-catch
    } else {
       // This case should ideally be caught by the initial determinedMediaType check
      return NextResponse.json({ error: `Unsupported file type: ${file.type}.` }, { status: 415 });
    }

    console.log(`Uploading main file to R2: ${finalFileName}`);
    const putObjectCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: finalFileName,
      Body: processedFileBuffer,
      ContentType: finalContentType,
      ACL: 'public-read',
    });

    await s3Client.send(putObjectCommand);

    const publicUrl = `${R2_PUBLIC_DOMAIN.replace(/\/$/, '')}/${finalFileName}`;

    return NextResponse.json({
      message: 'File uploaded successfully!',
      url: publicUrl,
      mediaType: determinedMediaType,
      format: convertedFormat,
      originalFormat: originalFormat,
      thumbnailUrl: uploadedThumbnailUrl,
      duration: videoDuration,
    }, { status: 201 });

  } catch (error) {
    console.error('Error during file upload process:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during upload.';
    // Check for specific error types if needed
    // SdkError includes a $metadata property with httpStatusCode
    const statusCode = (error as any)?.$metadata?.httpStatusCode || 500;
    return NextResponse.json({ error: 'Failed to upload file.', details: errorMessage }, { status: statusCode });
  } finally {
    if (tempDir) {
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
        console.log(`Successfully cleaned up temporary directory: ${tempDir}`);
      } catch (cleanupError) {
        console.error(`Failed to cleanup temporary directory ${tempDir}:`, cleanupError);
      }
    }
  }
}
