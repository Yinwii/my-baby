import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const babyId = searchParams.get('babyId')

    if (!babyId) {
      return NextResponse.json({ error: 'Baby ID is required' }, { status: 400 })
    }

    const photos = await prisma.photo.findMany({
      where: { babyId },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(photos)
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const photo = await prisma.photo.create({
      data: {
        babyId: data.babyId,
        date: new Date(data.date),
        title: data.title,
        description: data.description,
        url: data.url,
      },
    })

    return NextResponse.json(photo, { status: 201 })
  } catch (error) {
    console.error('Error creating photo:', error)
    return NextResponse.json({ error: 'Failed to create photo' }, { status: 500 })
  }
} 