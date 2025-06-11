import { useState, useEffect } from 'react'

interface Milestone {
  id: string
  babyId: string
  date: string
  title: string
  description: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export function useMilestones(babyId?: string) {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMilestones = async () => {
    if (!babyId) return
    
    try {
      setLoading(true)
      const response = await fetch(`/api/milestones?babyId=${babyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch milestones')
      }
      const data = await response.json()
      setMilestones(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createMilestone = async (milestoneData: Omit<Milestone, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/milestones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milestoneData),
      })
      if (!response.ok) {
        throw new Error('Failed to create milestone')
      }
      const data = await response.json()
      setMilestones(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const updateMilestone = async (id: string, milestoneData: Partial<Milestone>) => {
    try {
      const response = await fetch(`/api/milestones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milestoneData),
      })
      if (!response.ok) {
        throw new Error('Failed to update milestone')
      }
      const data = await response.json()
      setMilestones(prev => prev.map(milestone => milestone.id === id ? data : milestone))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const deleteMilestone = async (id: string) => {
    try {
      const response = await fetch(`/api/milestones/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete milestone')
      }
      setMilestones(prev => prev.filter(milestone => milestone.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const getMilestone = async (id: string) => {
    try {
      const response = await fetch(`/api/milestones/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch milestone')
      }
      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  useEffect(() => {
    if (babyId) {
      fetchMilestones()
    }
  }, [babyId])

  return {
    milestones,
    loading,
    error,
    refetch: fetchMilestones,
    createMilestone,
    updateMilestone,
    deleteMilestone,
    getMilestone,
  }
} 