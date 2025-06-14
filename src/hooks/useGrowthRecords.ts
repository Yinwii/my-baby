import { useState, useCallback } from 'react'
import { useCache, useCacheInvalidation } from './useCacheManager'

// 移除旧的缓存实现
// const growthRecordsCache = new Map<string, {
//   data: GrowthRecord[]
//   timestamp: number
//   loading: boolean
// }>()
// const CACHE_DURATION = 5 * 60 * 1000

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
  const { invalidate, invalidateBabyData } = useCacheInvalidation()
  const cacheKey = `growth-records-${babyId}`
  
  // 使用新的缓存系统
  const {
    data: records,
    loading,
    error,
    refetch
  } = useCache<GrowthRecord[]>(
    cacheKey,
    async () => {
      if (!babyId) return []
      const response = await fetch(`/api/growth-records?babyId=${babyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch growth records')
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

  const createRecord = async (recordData: Omit<GrowthRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setOperationError(null)
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
      
      // 失效相关缓存
      invalidate(`growth-records-${recordData.babyId}`)
      invalidateBabyData(recordData.babyId) // 同时失效baby统计数据
      
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  const updateRecord = async (id: string, recordData: Partial<GrowthRecord>) => {
    try {
      setOperationError(null)
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
      
      // 失效相关缓存
      if (babyId) {
        invalidate(`growth-records-${babyId}`)
        invalidateBabyData(babyId)
      }
      
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  const deleteRecord = async (id: string) => {
    try {
      setOperationError(null)
      const response = await fetch(`/api/growth-records/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete growth record')
      }
      
      // 失效相关缓存
      if (babyId) {
        invalidate(`growth-records-${babyId}`)
        invalidateBabyData(babyId)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  const getRecord = async (id: string) => {
    try {
      setOperationError(null)
      const response = await fetch(`/api/growth-records/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch growth record')
      }
      return await response.json()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  return {
    records: records || [],
    loading,
    error: error?.message || operationError,
    refetch: (forceRefresh = false) => refetch(forceRefresh),
    createRecord,
    updateRecord,
    deleteRecord,
    getRecord,
  }
} 