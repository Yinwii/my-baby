import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const milestone = await prisma.milestone.findUnique({
      where: { id },
      include: {
        baby: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!milestone) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 })
    }

    return NextResponse.json(milestone)
  } catch (error) {
    console.error('Error fetching milestone:', error)
    return NextResponse.json({ error: 'Failed to fetch milestone' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const milestone = await prisma.milestone.update({
      where: { id },
      data: {
        date: data.date ? new Date(data.date) : undefined,
        title: data.title,
        description: data.description !== undefined ? (data.description || null) : undefined,
        tags: data.tags,
      },
    })

    return NextResponse.json(milestone)
  } catch (error) {
    console.error('Error updating milestone:', error)
    return NextResponse.json({ error: 'Failed to update milestone' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.milestone.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Milestone deleted successfully' })
  } catch (error) {
    console.error('Error deleting milestone:', error)
    return NextResponse.json({ error: 'Failed to delete milestone' }, { status: 500 })
  }
} 