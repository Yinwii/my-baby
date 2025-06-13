import { useState, useEffect, useCallback } from 'react'

// 全局缓存
const photosCache = new Map<string, {
  data: MediaItem[]
  timestamp: number
  loading: boolean
}>()

const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

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
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const fetchPhotos = useCallback(async (forceRefresh = false, birthDate?: string) => {
    if (!babyId) return
    
    const cacheKey = `photos-${babyId}`
    const cached = photosCache.get(cacheKey)
    
    // 检查缓存是否有效
    if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setMediaItems(cached.data)
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
      photosCache.set(cacheKey, {
        data: cached?.data || [],
        timestamp: Date.now(),
        loading: true
      })
      
      const response = await fetch(`/api/photos?babyId=${babyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch photos')
      }
      const data = await response.json()
      
      // 计算年龄
      const itemsWithAge = data.map((item: MediaItem) => ({
        ...item,
        age: calculateAge(item.date, birthDate)
      }))
      
      // 更新缓存
      photosCache.set(cacheKey, {
        data: itemsWithAge,
        timestamp: Date.now(),
        loading: false
      })
      
      setMediaItems(itemsWithAge)
      return itemsWithAge
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      
      // 清除错误的缓存
      photosCache.delete(cacheKey)
      throw err
    } finally {
      setLoading(false)
    }
  }, [babyId, calculateAge])

  const uploadPhoto = async (uploadData: FormData) => {
    try {
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
      
      // 清除缓存并更新本地状态
      if (babyId) {
        const cacheKey = `photos-${babyId}`
        photosCache.delete(cacheKey)
      }
      
      setMediaItems(prev => [savedPhoto, ...prev])
      return savedPhoto
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const deletePhoto = async (photoId: string) => {
    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '删除失败')
      }

      // 清除缓存并更新本地状态
      if (babyId) {
        const cacheKey = `photos-${babyId}`
        photosCache.delete(cacheKey)
      }
      
      setMediaItems(prev => prev.filter(item => item.id !== photoId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  // 初始化时检查缓存
  useEffect(() => {
    if (babyId) {
      const cacheKey = `photos-${babyId}`
      const cached = photosCache.get(cacheKey)
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION && !cached.loading) {
        setMediaItems(cached.data)
      }
    }
  }, [babyId])

  return {
    mediaItems,
    loading,
    error,
    fetchPhotos,
    uploadPhoto,
    deletePhoto,
    setMediaItems, // 为了兼容现有代码
  }
} 