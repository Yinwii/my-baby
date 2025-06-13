import { useState, useEffect, useCallback } from 'react'

// 全局缓存
const growthRecordsCache = new Map<string, {
  data: GrowthRecord[]
  timestamp: number
  loading: boolean
}>()

const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

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

  const fetchRecords = useCallback(async (forceRefresh = false) => {
    if (!babyId) return
    
    const cacheKey = `growth-records-${babyId}`
    const cached = growthRecordsCache.get(cacheKey)
    
    // 检查缓存是否有效
    if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setRecords(cached.data)
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
      growthRecordsCache.set(cacheKey, {
        data: cached?.data || [],
        timestamp: Date.now(),
        loading: true
      })
      
      const response = await fetch(`/api/growth-records?babyId=${babyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch growth records')
      }
      const data = await response.json()
      
      // 更新缓存
      growthRecordsCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        loading: false
      })
      
      setRecords(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      
      // 清除错误的缓存
      growthRecordsCache.delete(cacheKey)
      throw err
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
      
      // 清除缓存并更新本地状态
      const cacheKey = `growth-records-${recordData.babyId}`
      growthRecordsCache.delete(cacheKey)
      
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
      
      // 清除缓存并更新本地状态
      if (babyId) {
        const cacheKey = `growth-records-${babyId}`
        growthRecordsCache.delete(cacheKey)
      }
      
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
      
      // 清除缓存并更新本地状态
      if (babyId) {
        const cacheKey = `growth-records-${babyId}`
        growthRecordsCache.delete(cacheKey)
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
      // 首先检查缓存
      const cacheKey = `growth-records-${babyId}`
      const cached = growthRecordsCache.get(cacheKey)
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION && !cached.loading) {
        setRecords(cached.data)
      } else if (!cached?.loading) {
        fetchRecords()
      }
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