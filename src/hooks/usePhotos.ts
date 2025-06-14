import { useState, useCallback } from 'react'
import { useCache, useCacheInvalidation } from './useCacheManager'

interface MediaItem {
  id: string
  url: string
  date: string
  title: string
  description: string | null
  age: string
  mediaType: 'IMAGE' | 'VIDEO'
  format?: string
  thumbnailUrl?: string
  duration?: number
}

export function usePhotos(babyId?: string) {
  const { invalidate, invalidateBabyData } = useCacheInvalidation()
  const cacheKey = `photos-${babyId}`
  
  const calculateAge = useCallback((date: string, birthDate?: string) => {
    if (!birthDate) return '未知'
    
    const birth = new Date(birthDate)
    const recordDate = new Date(date)
    const diffTime = Math.abs(recordDate.getTime() - birth.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 30) {
      return `${diffDays}天`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      const days = diffDays % 30
      return `${months}个月${days}天`
    } else {
      const years = Math.floor(diffDays / 365)
      const months = Math.floor((diffDays % 365) / 30)
      return `${years}岁${months}个月`
    }
  }, [])

  // 使用新的缓存系统
  const {
    data: mediaItems,
    loading,
    error,
    refetch
  } = useCache<MediaItem[]>(
    cacheKey,
    async () => {
      if (!babyId) return []
      const response = await fetch(`/api/photos?babyId=${babyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch photos')
      }
      return response.json()
    },
    {
      duration: 5 * 60 * 1000, // 5分钟缓存
      autoRefresh: false, // photos通常不自动刷新，因为可能数据量大
      dependencies: [babyId]
    }
  )

  const [operationError, setOperationError] = useState<string | null>(null)

  // 手动触发获取photos的方法
  const fetchPhotos = useCallback(async (forceRefresh = false, birthDate?: string) => {
    try {
      const data = await refetch(forceRefresh)
      
      // 如果有birthDate，计算年龄
      if (data && birthDate) {
        const itemsWithAge = data.map((item: MediaItem) => ({
          ...item,
          age: calculateAge(item.date, birthDate)
        }))
        return itemsWithAge
      }
      
      return data
    } catch (err) {
      throw err
    }
  }, [refetch, calculateAge])

  const uploadPhoto = async (uploadData: FormData) => {
    try {
      setOperationError(null)
      // 第一步：上传文件到R2
      const uploadResponse = await fetch('/api/photos/upload', {
        method: 'POST',
        body: uploadData,
      })

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json()
        throw new Error(errorData.error || '上传文件失败')
      }

      const uploadResult = await uploadResponse.json()
      
      // 第二步：保存元数据到数据库
      const saveResponse = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uploadResult),
      })

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json()
        throw new Error(errorData.error || '保存失败')
      }

      const savedPhoto = await saveResponse.json()
      
      // 失效相关缓存
      if (babyId) {
        invalidate(`photos-${babyId}`)
        invalidateBabyData(babyId) // 同时失效baby统计数据
      }
      
      return savedPhoto
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  const deletePhoto = async (photoId: string) => {
    try {
      setOperationError(null)
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '删除失败')
      }

      // 失效相关缓存
      if (babyId) {
        invalidate(`photos-${babyId}`)
        invalidateBabyData(babyId)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setOperationError(errorMessage)
      throw err
    }
  }

  return {
    mediaItems: mediaItems || [],
    loading,
    error: error?.message || operationError,
    fetchPhotos,
    uploadPhoto,
    deletePhoto,
    setMediaItems: () => {
      // 兼容现有代码，但建议使用cache invalidation
      console.warn('setMediaItems is deprecated, use cache invalidation instead')
    },
    refetch: (forceRefresh = false) => refetch(forceRefresh)
  }
} 