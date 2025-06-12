import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const babyId = searchParams.get('babyId')

    if (!babyId) {
      return NextResponse.json({ error: 'Baby ID is required' }, { status: 400 })
    }

    const mediaItems = await prisma.mediaItem.findMany({ // Changed from prisma.photo.findMany
      where: { babyId },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(mediaItems) // Changed from photos
  } catch (error) {
    console.error('Error fetching media items:', error) // Changed from photos
    return NextResponse.json({ error: 'Failed to fetch media items' }, { status: 500 }) // Changed from photos
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const mediaItem = await prisma.mediaItem.create({ // Changed from prisma.photo.create
      data: {
        babyId: data.babyId,
        date: new Date(data.date),
        title: data.title,
        description: data.description,
        url: data.url, // URL of the main media (image or video)
        mediaType: data.mediaType, // "IMAGE" or "VIDEO"
        format: data.format, // e.g., "jpeg", "mp4"
        originalFormat: data.originalFormat, // e.g., "heic", "mov"
        thumbnailUrl: data.thumbnailUrl, // URL of video thumbnail
        duration: data.duration, // Video duration in seconds
      },
    })

    return NextResponse.json(mediaItem, { status: 201 }) // Changed from photo
  } catch (error) {
    console.error('Error creating media item:', error) // Changed from photo
    return NextResponse.json({ error: 'Failed to create media item' }, { status: 500 }) // Changed from photo
  }
} 