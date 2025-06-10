import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const babyId = searchParams.get('babyId')

    if (!babyId) {
      return NextResponse.json({ error: 'Baby ID is required' }, { status: 400 })
    }

    const entries = await prisma.diaryEntry.findMany({
      where: { babyId },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching diary entries:', error)
    return NextResponse.json({ error: 'Failed to fetch diary entries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const entry = await prisma.diaryEntry.create({
      data: {
        babyId: data.babyId,
        date: new Date(data.date),
        title: data.title,
        content: data.content,
        mood: data.mood,
        weather: data.weather,
        tags: data.tags || [],
      },
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Error creating diary entry:', error)
    return NextResponse.json({ error: 'Failed to create diary entry' }, { status: 500 })
  }
} 