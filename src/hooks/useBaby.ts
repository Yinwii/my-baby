import { useState, useEffect, useCallback } from 'react'

// 添加简单的内存缓存
const cache = new Map<string, { data: Baby; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

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
    mediaItems: number
    diaryEntries: number
  }
}

export function useBaby() {
  const [baby, setBaby] = useState<Baby | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBaby = useCallback(async (useCache = true) => {
    try {
      setLoading(true)
      
      // 检查缓存
      if (useCache) {
        const cached = cache.get('baby')
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          setBaby(cached.data)
          setLoading(false)
          return cached.data
        }
      }
      
      const response = await fetch('/api/baby')
      if (!response.ok) {
        throw new Error('Failed to fetch baby data')
      }
      const data = await response.json()
      
      // 更新缓存
      cache.set('baby', { data, timestamp: Date.now() })
      
      setBaby(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

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
      
      // 清除缓存并更新状态
      cache.delete('baby')
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
      
      // 清除缓存并更新状态
      cache.delete('baby')
      setBaby(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  useEffect(() => {
    fetchBaby()
  }, [fetchBaby])

  return {
    baby,
    loading,
    error,
    refetch: fetchBaby,
    createBaby,
    updateBaby,
  }
} 