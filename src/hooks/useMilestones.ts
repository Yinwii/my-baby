import { useState } from 'react'
import { useCache, useCacheInvalidation } from './useCacheManager'

// 移除旧的缓存实现
// const milestonesCache = new Map<string, {
//   data: Milestone[]
//   timestamp: number
//   loading: boolean
// }>()
// const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

interface Milestone {
  id: string
  babyId: string
  date: string
  title: string
  description?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export function useMilestones(babyId?: string) {
  const { invalidate, invalidateBabyData } = useCacheInvalidation()
  const cacheKey = `milestones-${babyId}`
  
  // 使用新的缓存系统
  const {
    data: milestones,
    loading,
    error,
    refetch
  } = useCache<Milestone[]>(
    cacheKey,
    async () => {
      if (!babyId) return []
      const response = await fetch(`/api/milestones?babyId=${babyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch milestones')
      }
      return response.json()
    },
    {
      duration: 5 * 60 * 1000, // 5分钟缓存
      autoRefresh: true,
      dependencies: [babyId]
    }
  )

  const [operationError, setOperationError] = useState<string | null>(null)

  const createMilestone = async (milestoneData: Omit<Milestone, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setOperationError(null)
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
      
      // 失效相关缓存
      invalidate(`milestones-${milestoneData.babyId}`)
      invalidateBabyData(milestoneData.babyId) // 同时失效baby统计数据
      
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  const updateMilestone = async (id: string, milestoneData: Partial<Milestone>) => {
    try {
      setOperationError(null)
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
      
      // 失效相关缓存
      if (babyId) {
        invalidate(`milestones-${babyId}`)
        invalidateBabyData(babyId)
      }
      
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  const deleteMilestone = async (id: string) => {
    try {
      setOperationError(null)
      const response = await fetch(`/api/milestones/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete milestone')
      }
      
      // 失效相关缓存
      if (babyId) {
        invalidate(`milestones-${babyId}`)
        invalidateBabyData(babyId)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  const getMilestone = async (id: string) => {
    try {
      setOperationError(null)
      const response = await fetch(`/api/milestones/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch milestone')
      }
      return await response.json()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  return {
    milestones: milestones || [],
    loading,
    error: error?.message || operationError,
    refetch: (forceRefresh = false) => refetch(forceRefresh),
    createMilestone,
    updateMilestone,
    deleteMilestone,
    getMilestone,
  }
} 