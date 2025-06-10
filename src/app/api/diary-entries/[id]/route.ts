import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const entry = await prisma.diaryEntry.findUnique({
      where: { id },
      include: {
        baby: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!entry) {
      return NextResponse.json({ error: 'Diary entry not found' }, { status: 404 })
    }

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error fetching diary entry:', error)
    return NextResponse.json({ error: 'Failed to fetch diary entry' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const entry = await prisma.diaryEntry.update({
      where: { id },
      data: {
        date: data.date ? new Date(data.date) : undefined,
        title: data.title,
        content: data.content,
        mood: data.mood,
        weather: data.weather,
        tags: data.tags || [],
      },
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error updating diary entry:', error)
    return NextResponse.json({ error: 'Failed to update diary entry' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.diaryEntry.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Diary entry deleted successfully' })
  } catch (error) {
    console.error('Error deleting diary entry:', error)
    return NextResponse.json({ error: 'Failed to delete diary entry' }, { status: 500 })
  }
} 