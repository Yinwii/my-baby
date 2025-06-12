import { useState, useEffect, useCallback } from 'react'

interface GrowthRecord {
  id: string
  babyId: string
  date: string
  weight?: number
  height?: number
  headCircumference?: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export function useGrowthRecords(babyId?: string) {
  const [records, setRecords] = useState<GrowthRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecords = useCallback(async () => {
    if (!babyId) return
    
    try {
      setLoading(true)
      const response = await fetch(`/api/growth-records?babyId=${babyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch growth records')
      }
      const data = await response.json()
      setRecords(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [babyId])

  const createRecord = async (recordData: Omit<GrowthRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/growth-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      })
      if (!response.ok) {
        throw new Error('Failed to create growth record')
      }
      const data = await response.json()
      setRecords(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const updateRecord = async (id: string, recordData: Partial<GrowthRecord>) => {
    try {
      const response = await fetch(`/api/growth-records/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      })
      if (!response.ok) {
        throw new Error('Failed to update growth record')
      }
      const data = await response.json()
      setRecords(prev => prev.map(record => record.id === id ? data : record))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(`/api/growth-records/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete growth record')
      }
      setRecords(prev => prev.filter(record => record.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const getRecord = async (id: string) => {
    try {
      const response = await fetch(`/api/growth-records/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch growth record')
      }
      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  useEffect(() => {
    if (babyId) {
      fetchRecords()
    }
  }, [babyId, fetchRecords])

  return {
    records,
    loading,
    error,
    refetch: fetchRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    getRecord,
  }
} 