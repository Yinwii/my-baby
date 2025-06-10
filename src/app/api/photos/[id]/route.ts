import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const photo = await prisma.photo.findUnique({
      where: { id },
      include: {
        baby: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
    }

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Error fetching photo:', error)
    return NextResponse.json({ error: 'Failed to fetch photo' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const photo = await prisma.photo.update({
      where: { id },
      data: {
        date: data.date ? new Date(data.date) : undefined,
        title: data.title,
        description: data.description,
        url: data.url,
      },
    })

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Error updating photo:', error)
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.photo.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Photo deleted successfully' })
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
  }
} 