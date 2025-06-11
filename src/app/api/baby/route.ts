import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // For now, we'll get the first baby (single baby app)
    // In a multi-user app, you'd filter by user ID
    const baby = await prisma.baby.findFirst({
      include: {
        _count: {
          select: {
            growthRecords: true,
            milestones: true,
            photos: true,
          },
        },
      },
    })

    return NextResponse.json(baby)
  } catch (error) {
    console.error('Error fetching baby:', error)
    return NextResponse.json({ error: 'Failed to fetch baby data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const baby = await prisma.baby.create({
      data: {
        name: data.name,
        birthDate: new Date(data.birthDate),
        birthTime: data.birthTime,
        gender: data.gender,
        birthWeight: data.birthWeight ? parseFloat(data.birthWeight) : null,
        birthHeight: data.birthHeight ? parseFloat(data.birthHeight) : null,
        birthHeadCircumference: data.birthHeadCircumference ? parseFloat(data.birthHeadCircumference) : null,
        bloodType: data.bloodType,
        allergies: data.allergies,
        notes: data.notes,
      },
    })

    return NextResponse.json(baby, { status: 201 })
  } catch (error) {
    console.error('Error creating baby:', error)
    return NextResponse.json({ error: 'Failed to create baby' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    const baby = await prisma.baby.update({
      where: { id },
      data: {
        name: updateData.name,
        birthDate: updateData.birthDate ? new Date(updateData.birthDate) : undefined,
        birthTime: updateData.birthTime,
        gender: updateData.gender,
        birthWeight: updateData.birthWeight ? parseFloat(updateData.birthWeight) : null,
        birthHeight: updateData.birthHeight ? parseFloat(updateData.birthHeight) : null,
        birthHeadCircumference: updateData.birthHeadCircumference ? parseFloat(updateData.birthHeadCircumference) : null,
        bloodType: updateData.bloodType,
        allergies: updateData.allergies,
        notes: updateData.notes,
      },
    })

    return NextResponse.json(baby)
  } catch (error) {
    console.error('Error updating baby:', error)
    return NextResponse.json({ error: 'Failed to update baby' }, { status: 500 })
  }
} 