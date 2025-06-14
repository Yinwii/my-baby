import { useState } from 'react'
import { useCache, useCacheInvalidation } from './useCacheManager'

// 移除旧的缓存实现
// const cache = new Map<string, { data: Baby; timestamp: number }>()
// const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

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
  const { invalidateBabyData } = useCacheInvalidation()
  
  // 使用新的缓存系统
  const {
    data: baby,
    loading,
    error,
    refetch
  } = useCache<Baby>(
    'baby',
    async () => {
      const response = await fetch('/api/baby')
      if (!response.ok) {
        throw new Error('Failed to fetch baby data')
      }
      return response.json()
    },
    {
      duration: 5 * 60 * 1000, // 5分钟缓存
      autoRefresh: true
    }
  )

  const [operationError, setOperationError] = useState<string | null>(null)

  const createBaby = async (babyData: Omit<Baby, 'id' | '_count'>) => {
    try {
      setOperationError(null)
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
      
      // 使用新的缓存失效机制
      if (data.id) {
        invalidateBabyData(data.id)
      }
      
      // 立即刷新缓存
      await refetch(true)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  const updateBaby = async (babyData: Partial<Baby> & { id: string }) => {
    try {
      setOperationError(null)
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
      
      // 使用新的缓存失效机制
      invalidateBabyData(babyData.id)
      
      // 立即刷新缓存
      await refetch(true)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  // 移除旧的fetchBaby和useEffect，现在由useCache处理

  return {
    baby,
    loading,
    error: error?.message || operationError,
    refetch: (useCache?: boolean) => refetch(!useCache),
    createBaby,
    updateBaby,
  }
} 