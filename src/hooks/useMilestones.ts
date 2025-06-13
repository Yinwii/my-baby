import { useState, useEffect, useCallback } from 'react'

// 全局缓存
const milestonesCache = new Map<string, {
  data: Milestone[]
  timestamp: number
  loading: boolean
}>()

const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

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

  const fetchMilestones = useCallback(async (forceRefresh = false) => {
    if (!babyId) return
    
    const cacheKey = `milestones-${babyId}`
    const cached = milestonesCache.get(cacheKey)
    
    // 检查缓存是否有效
    if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setMilestones(cached.data)
      setLoading(cached.loading)
      return cached.data
    }
    
    // 防止重复请求
    if (cached?.loading) {
      return
    }
    
    try {
      setLoading(true)
      
      // 设置加载状态到缓存
      milestonesCache.set(cacheKey, {
        data: cached?.data || [],
        timestamp: Date.now(),
        loading: true
      })
      
      const response = await fetch(`/api/milestones?babyId=${babyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch milestones')
      }
      const data = await response.json()
      
      // 更新缓存
      milestonesCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        loading: false
      })
      
      setMilestones(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      
      // 清除错误的缓存
      milestonesCache.delete(cacheKey)
      throw err
    } finally {
      setLoading(false)
    }
  }, [babyId])

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
      
      // 清除缓存并更新本地状态
      const cacheKey = `milestones-${milestoneData.babyId}`
      milestonesCache.delete(cacheKey)
      
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
      
      // 清除缓存并更新本地状态
      if (babyId) {
        const cacheKey = `milestones-${babyId}`
        milestonesCache.delete(cacheKey)
      }
      
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
      
      // 清除缓存并更新本地状态
      if (babyId) {
        const cacheKey = `milestones-${babyId}`
        milestonesCache.delete(cacheKey)
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
      // 首先检查缓存
      const cacheKey = `milestones-${babyId}`
      const cached = milestonesCache.get(cacheKey)
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION && !cached.loading) {
        setMilestones(cached.data)
      } else if (!cached?.loading) {
        fetchMilestones()
      }
    }
  }, [babyId, fetchMilestones])

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