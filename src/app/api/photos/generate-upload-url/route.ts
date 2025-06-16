import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.R2_REGION || 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;


export async function POST(request: NextRequest) {
  if (!R2_BUCKET_NAME) {
    console.error('R2_BUCKET_NAME is not set');
    return NextResponse.json({ error: 'Server configuration error: Bucket name missing' }, { status: 500 });
  }
  if (!R2_PUBLIC_DOMAIN) {
    console.error('R2_PUBLIC_DOMAIN is not set');
    return NextResponse.json({ error: 'Server configuration error: Public URL missing' }, { status: 500 });
  }

  try {
    const { filename, contentType } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'Filename and contentType are required' }, { status: 400 });
    }

    // Sanitize filename and generate a unique key
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const fileExtension = sanitizedFilename.split('.').pop();
    const uniqueKey = fileExtension
      ? `${uuidv4()}.${fileExtension}`
      : `${uuidv4()}-${sanitizedFilename}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: contentType,
      // ACL: 'public-read', // Optional: if you want the object to be publicly readable by default
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // Expires in 1 hour

    // Construct the public URL after upload
    const publicUrl = `${R2_PUBLIC_DOMAIN}/${uniqueKey}`;

    return NextResponse.json({
      success: true,
      uploadUrl: signedUrl,
      key: uniqueKey,
      publicUrl: publicUrl // This is the URL to store in DB and use for accessing the file
    });

  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to generate upload URL', details: errorMessage }, { status: 500 });
  }
}
