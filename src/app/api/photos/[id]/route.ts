import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const mediaItem = await prisma.mediaItem.findUnique({ // Changed from prisma.photo.findUnique
      where: { id },
      include: {
        baby: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!mediaItem) { // Changed from photo
      return NextResponse.json({ error: 'Media item not found' }, { status: 404 }) // Changed from Photo
    }

    return NextResponse.json(mediaItem) // Changed from photo
  } catch (error) {
    console.error('Error fetching media item:', error) // Changed from photo
    return NextResponse.json({ error: 'Failed to fetch media item' }, { status: 500 }) // Changed from photo
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const mediaItem = await prisma.mediaItem.update({ // Changed from prisma.photo.update
      where: { id },
      data: {
        date: data.date ? new Date(data.date) : undefined,
        title: data.title,
        description: data.description,
        url: data.url,
        // Include new fields, making them updatable if provided
        mediaType: data.mediaType,
        format: data.format,
        originalFormat: data.originalFormat,
        thumbnailUrl: data.thumbnailUrl,
        duration: data.duration,
      },
    })

    return NextResponse.json(mediaItem) // Changed from photo
  } catch (error) {
    console.error('Error updating media item:', error) // Changed from photo
    return NextResponse.json({ error: 'Failed to update media item' }, { status: 500 }) // Changed from photo
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.mediaItem.delete({ // Changed from prisma.photo.delete
      where: { id },
    })

    return NextResponse.json({ message: 'Media item deleted successfully' }) // Changed from Photo
  } catch (error) {
    console.error('Error deleting media item:', error) // Changed from photo
    return NextResponse.json({ error: 'Failed to delete media item' }, { status: 500 }) // Changed from photo
  }
} 