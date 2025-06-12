import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'; // This might be used for direct client uploads later, but for now, we'll do backend uploads.
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames

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

export async function POST(request: NextRequest) {
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

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`; // Create a unique filename

    const putObjectCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
      ContentType: file.type,
      ACL: 'public-read', // If you want the file to be publicly accessible directly via R2 URL
    });

    await s3Client.send(putObjectCommand);

    // Construct the public URL
    // Ensure R2_PUBLIC_DOMAIN does not have a trailing slash and fileName does not have a leading slash
    const publicUrl = `${R2_PUBLIC_DOMAIN.replace(/\/$/, '')}/${fileName}`;

    return NextResponse.json({ message: 'File uploaded successfully!', url: publicUrl }, { status: 201 });

  } catch (error) {
    console.error('Error uploading file to R2:', error);
    // Check for specific error types if needed
    if (error instanceof Error) {
        // SdkError includes a $metadata property with httpStatusCode
        const statusCode = (error as any)?.$metadata?.httpStatusCode || 500;
        return NextResponse.json({ error: 'Failed to upload file.', details: error.message }, { status: statusCode });
    }
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}
