import { useState, useEffect } from 'react'

interface Baby {
  id: string
  name: string
  birthDate: string
  birthTime?: string
  gender: string
  birthWeight?: number
  birthHeight?: number
  birthHeadCircumference?: number
  bloodType?: string
  allergies?: string
  notes?: string
  _count?: {
    growthRecords: number
    milestones: number
    photos: number
    diaryEntries: number
  }
}

export function useBaby() {
  const [baby, setBaby] = useState<Baby | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBaby = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/baby')
      if (!response.ok) {
        throw new Error('Failed to fetch baby data')
      }
      const data = await response.json()
      setBaby(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createBaby = async (babyData: Omit<Baby, 'id' | '_count'>) => {
    try {
      const response = await fetch('/api/baby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(babyData),
      })
      if (!response.ok) {
        throw new Error('Failed to create baby')
      }
      const data = await response.json()
      setBaby(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const updateBaby = async (babyData: Partial<Baby> & { id: string }) => {
    try {
      const response = await fetch('/api/baby', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(babyData),
      })
      if (!response.ok) {
        throw new Error('Failed to update baby')
      }
      const data = await response.json()
      setBaby(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  useEffect(() => {
    fetchBaby()
  }, [])

  return {
    baby,
    loading,
    error,
    refetch: fetchBaby,
    createBaby,
    updateBaby,
  }
} 