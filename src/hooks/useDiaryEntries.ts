import { useState, useEffect } from 'react'

interface DiaryEntry {
  id: string
  babyId: string
  date: string
  title: string
  content: string
  mood: string
  weather?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export function useDiaryEntries(babyId?: string) {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEntries = async () => {
    if (!babyId) return
    
    try {
      setLoading(true)
      const response = await fetch(`/api/diary-entries?babyId=${babyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch diary entries')
      }
      const data = await response.json()
      setEntries(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createEntry = async (entryData: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/diary-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      })
      if (!response.ok) {
        throw new Error('Failed to create diary entry')
      }
      const data = await response.json()
      setEntries(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const updateEntry = async (id: string, entryData: Partial<DiaryEntry>) => {
    try {
      const response = await fetch(`/api/diary-entries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      })
      if (!response.ok) {
        throw new Error('Failed to update diary entry')
      }
      const data = await response.json()
      setEntries(prev => prev.map(entry => entry.id === id ? data : entry))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      const response = await fetch(`/api/diary-entries/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete diary entry')
      }
      setEntries(prev => prev.filter(entry => entry.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const getEntry = async (id: string) => {
    try {
      const response = await fetch(`/api/diary-entries/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch diary entry')
      }
      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  useEffect(() => {
    if (babyId) {
      fetchEntries()
    }
  }, [babyId])

  return {
    entries,
    loading,
    error,
    refetch: fetchEntries,
    createEntry,
    updateEntry,
    deleteEntry,
    getEntry,
  }
} 