'use client'

import { useState, useEffect, useCallback, useRef } from 'react' // Added useRef
import Image from 'next/image'
import { useBaby } from '@/hooks/useBaby'
import { useToastContext } from '@/components/providers/ToastProvider'

interface MediaItem { // Renamed from Photo
  id: string;
  url: string; // URL of the main media (image or video)
  date: string;
  title: string;
  description: string | null; // Made description nullable to match schema
  age: string; // This is client-calculated, will keep for now
  mediaType: 'IMAGE' | 'VIDEO'; // Added
  format?: string; // e.g., "jpeg", "mp4" - Added
  thumbnailUrl?: string; // URL of video thumbnail - Added
  duration?: number; // Video duration in seconds - Added
}

// Helper function to format duration from seconds to MM:SS
const formatDuration = (seconds: number | undefined): string | null => {
  if (seconds === undefined || seconds === null) return null;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Helper function to format date to Chinese readable format
const formatDateDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function PhotoGallery() { // Consider renaming to MediaGallery later if desired
  const { baby, loading, error } = useBaby()
  const toast = useToastContext()
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  
  // Debug logging
  console.log('PhotoGallery - baby:', baby)
  console.log('PhotoGallery - loading:', loading)
  console.log('PhotoGallery - error:', error)
  
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]) // Renamed from photos, updated type

  const [selectedMediaItem, setSelectedMediaItem] = useState<MediaItem | null>(null); // Renamed from selectedPhoto
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [newMediaItemData, setNewMediaItemData] = useState({ // Renamed from newPhoto
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: ''
  });

  const calculateAge = useCallback((date: string) => {
    if (!baby?.birthDate) return '未知'
    
    const birth = new Date(baby.birthDate)
    const photoDate = new Date(date)
    const diffTime = Math.abs(photoDate.getTime() - birth.getTime())
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
  }, [baby?.birthDate])

  // Load media items when baby changes or component mounts
  useEffect(() => {
    const loadMediaItems = async () => {
      if (!baby?.id) {
        setMediaItems([])
        return
      }

      try {
        const response = await fetch(`/api/photos?babyId=${baby.id}`)
        
        if (response.ok) {
          const data = await response.json()
          const itemsWithAge = data.map((item: MediaItem) => ({
            ...item,
            age: calculateAge(item.date)
          }))
          setMediaItems(itemsWithAge)
        } else {
          console.error('Failed to fetch media items')
        }
      } catch (error) {
        console.error('Error loading media items:', error)
      }
    }
    
    loadMediaItems()
  }, [baby?.id, calculateAge])

  // Update ages when baby birth date changes
  useEffect(() => {
    if (baby?.birthDate) {
      // Only update if we have items and the birthDate has actually changed
      setMediaItems(prevItems => {
        if (prevItems.length === 0) return prevItems
        
        return prevItems.map(item => ({
          ...item,
          age: calculateAge(item.date)
        }))
      })
    }
  }, [baby?.birthDate, calculateAge])

  // Renamed from handleUploadPhoto to handleUploadMediaItem
  const handleUploadMediaItem = async () => {
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      const errorMsg = `文件大小不能超过 ${MAX_FILE_SIZE / (1024 * 1024)}MB。`;
      console.error('Validation error:', errorMsg)
      toast.error('上传失败', errorMsg)
      setUploadError(errorMsg)
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSelectedFile(null);
      return;
    }

    console.log('Starting upload process...')
    console.log('Baby:', baby)
    console.log('Selected file:', selectedFile)
    console.log('Form data:', newMediaItemData)

    if (!selectedFile) {
      const error = '请选择一个文件进行上传。'
      console.error('Validation error:', error)
      toast.error('上传失败', error)
      setUploadError(error)
      return;
    }
    if (!newMediaItemData.title) {
      const error = '请填写标题。'
      console.error('Validation error:', error)
      toast.error('验证失败', error)
      setUploadError(error)
      return;
    }

    if (!baby?.id) {
      const error = '请先创建宝宝信息。'
      console.error('Validation error:', error)
      toast.error('验证失败', error)
      setUploadError(error)
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Step 1: Get pre-signed URL from our new API route
      console.log('Step 1: Getting pre-signed URL...');
      const presignedUrlResponse = await fetch('/api/photos/generate-upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: selectedFile!.name, // selectedFile is guaranteed to be non-null here
          contentType: selectedFile!.type,
        }),
      });

      if (!presignedUrlResponse.ok) {
        const errorData = await presignedUrlResponse.json();
        throw new Error(errorData.error || `获取上传授权失败 (HTTP ${presignedUrlResponse.status})`);
      }

      const { uploadUrl, key: r2ObjectKey, publicUrl: r2PublicUrl } = await presignedUrlResponse.json();
      console.log('Received pre-signed URL:', uploadUrl);
      console.log('R2 Object Key:', r2ObjectKey);
      console.log('R2 Public URL:', r2PublicUrl);

      // Step 2: Upload the file directly to R2 using the pre-signed URL
      console.log('Step 2: Uploading file to R2...');
      const r2UploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: selectedFile,
      });

      if (!r2UploadResponse.ok) {
        // Attempt to get error details from R2, though it might be opaque
        const r2ErrorText = await r2UploadResponse.text();
        console.error('R2 Upload Error Response Text:', r2ErrorText);
        throw new Error(`上传文件到存储服务失败 (HTTP ${r2UploadResponse.status}). ${r2ErrorText ? 'Details: '+r2ErrorText.substring(0,100) : ''}`);
      }

      console.log('File uploaded to R2 successfully!');

      // Step 3: Save media item metadata to our database (this part will be fully implemented later)
      // For now, we'll log the data that would be sent.
      // The actual /api/photos POST request will need to be updated to handle new fields if necessary (e.g. no thumbnailUrl, duration yet)
      // and it might not return the full media item with ID immediately if thumbnail/duration processing is async.

      const mediaDataForDb = {
        babyId: baby!.id, // baby is guaranteed to be non-null here
        date: newMediaItemData.date,
        title: newMediaItemData.title,
        description: newMediaItemData.description || null,
        url: r2PublicUrl, // This is the final public URL from R2
        mediaType: selectedFile!.type.startsWith('image/') ? 'IMAGE' : 'VIDEO',
        format: selectedFile!.type.split('/')[1] || selectedFile!.type, // Fallback to full type if split fails
        thumbnailUrl: null, // Simplified handling, no client-side thumbnail generation
        duration: null,     // Simplified handling, no client-side duration extraction
      };

      console.log('Step 3: Saving media metadata to database...', mediaDataForDb);

      const saveMediaResponse = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mediaDataForDb),
      });

      if (!saveMediaResponse.ok) {
        const errorData = await saveMediaResponse.json();
        throw new Error(errorData.error || `保存媒体信息失败 (HTTP ${saveMediaResponse.status})`);
      }

      const savedMediaItemWithId = await saveMediaResponse.json();
      console.log('Saved media item:', savedMediaItemWithId);

      // Update UI
      const finalMediaItemObject: MediaItem = {
        ...savedMediaItemWithId, // This should include id, url, title, date, etc. from DB
        age: calculateAge(savedMediaItemWithId.date), // Calculate age client-side
        // Ensure mediaType and format from DB are used, or fall back if not present in savedMediaItemWithId
        mediaType: savedMediaItemWithId.mediaType || mediaDataForDb.mediaType,
        format: savedMediaItemWithId.format || mediaDataForDb.format,
        thumbnailUrl: savedMediaItemWithId.thumbnailUrl, // Will be null for now
        duration: savedMediaItemWithId.duration,       // Will be null for now
      };

      setMediaItems(prev => [finalMediaItemObject, ...prev]);

      toast.success('上传成功', '文件已成功上传并保存媒体信息！');
      setNewMediaItemData({ date: new Date().toISOString().split('T')[0], title: '', description: '' });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setShowUploadForm(false);

    } catch (error) {
      console.error('Upload process failed:', error);
      const errorMessage = error instanceof Error ? error.message : '发生未知错误。';
      console.error('Error message:', errorMessage)
      setUploadError(errorMessage);
      toast.error('上传失败', errorMessage)
    } finally {
      setIsUploading(false);
    }
  };

  // Renamed from groupedPhotos to groupedMediaItems
  const groupedMediaItems = mediaItems.reduce((acc, item) => { // Renamed variable
    const month = item.date.substring(0, 7);
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {} as Record<string, MediaItem[]>); // Updated type

  // Add delete handler for media items
  const handleDeleteMediaItem = async (mediaItemId: string) => {
    if (!confirm('确定要删除这个媒体文件吗？此操作无法撤销。')) {
      return;
    }

    try {
      const response = await fetch(`/api/photos/${mediaItemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the item from local state
        setMediaItems(prev => prev.filter(item => item.id !== mediaItemId));
        // Close the modal if this item was selected
        if (selectedMediaItem?.id === mediaItemId) {
          setSelectedMediaItem(null);
        }
        toast.success('删除成功', '媒体文件已成功删除')
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || '删除失败');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      const errorMessage = error instanceof Error ? error.message : '删除过程中发生未知错误';
      toast.error('删除失败', errorMessage)
    }
  };

  // Show loading state if baby is still loading
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  // Show error state if there's an error loading baby data
  if (error) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center py-12">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-red-600">加载失败: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">媒体墙</h2>
          <p className="text-gray-600">记录宝宝成长的珍贵时刻</p>
        </div>
        <button
          onClick={() => setShowUploadForm(true)}
          className="btn-primary"
        >
          上传媒体文件
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl mb-2">📸</div>
          <p className="text-sm text-gray-600 mb-1">总媒体数</p>
          <p className="text-2xl font-bold text-blue-600">{mediaItems.length}</p>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">📅</div>
          <p className="text-sm text-gray-600 mb-1">最新媒体</p>
          <p className="text-2xl font-bold text-green-600">
            {mediaItems[0]?.date ? formatDateDisplay(mediaItems[0].date) : '暂无'}
          </p>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">🎂</div>
          <p className="text-sm text-gray-600 mb-1">记录时长</p>
          <p className="text-2xl font-bold text-purple-600">
            {Object.keys(groupedMediaItems).length} 个月
          </p>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">上传新媒体</h3>
            {uploadError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">发生错误: </strong>
                <span className="block sm:inline">{uploadError}</span>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择文件 (图片或视频)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*,video/*" // Updated accept attribute
                    className="hidden"
                    id="media-upload" // Changed id for clarity
                    ref={fileInputRef} // Added ref
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        if (file.size > MAX_FILE_SIZE) {
                          const errorMsg = `文件 "${file.name}" 太大了。请选择小于 ${MAX_FILE_SIZE / (1024 * 1024)}MB 的文件。`;
                          toast.error('文件过大', errorMsg);
                          setUploadError(errorMsg);
                          // Clear the file input
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                          setSelectedFile(null);
                        } else {
                          setSelectedFile(file);
                          setUploadError(null); // Clear previous error
                        }
                      } else {
                        setSelectedFile(null);
                      }
                    }}
                    disabled={isUploading}
                  />
                  {!selectedFile ? (
                    <>
                      <div className="text-4xl mb-2">🖼️🎬</div>
                      <p className="text-gray-600 mb-2">点击选择图片或视频</p>
                      <label
                        htmlFor="media-upload" // Changed htmlFor
                        className={`btn-secondary cursor-pointer inline-block ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        选择文件
                      </label>
                    </>
                  ) : (
                    <div className="text-left">
                      <p className="text-sm text-gray-700">已选择文件:</p>
                      <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">类型: {selectedFile.type}</p>
                      <p className="text-xs text-gray-500">大小: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-xs text-red-500 hover:text-red-700 mt-1"
                        disabled={isUploading}
                      >
                        清除选择
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  日期
                </label>
                <input
                  type="date"
                  value={newMediaItemData.date} // Updated state name
                  onChange={(e) => setNewMediaItemData(prev => ({ ...prev, date: e.target.value }))} // Updated state name
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标题
                </label>
                <input
                  type="text"
                  value={newMediaItemData.title} // Updated state name
                  onChange={(e) => setNewMediaItemData(prev => ({ ...prev, title: e.target.value }))} // Updated state name
                  className="input-field"
                  placeholder="例如：第一次笑"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  描述
                </label>
                <textarea
                  value={newMediaItemData.description || ''} // Updated state name, handle null
                  onChange={(e) => setNewMediaItemData(prev => ({ ...prev, description: e.target.value }))} // Updated state name
                  className="input-field"
                  rows={3}
                  placeholder="描述这个媒体文件的故事..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleUploadMediaItem} // Renamed handler
                className="btn-primary flex-1"
                disabled={isUploading}
              >
                {isUploading ? '上传中...' : '上传文件'}
              </button>
              <button
                onClick={() => {
                  if (isUploading) return;
                  setShowUploadForm(false);
                  setUploadError(null);
                  setSelectedFile(null);
                }}
                className={`btn-secondary flex-1 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isUploading}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Item Detail Modal */}
      {selectedMediaItem && ( // Renamed from selectedPhoto
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedMediaItem.title}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeleteMediaItem(selectedMediaItem.id)}
                    className="text-red-500 hover:text-red-700 text-sm px-3 py-1 border border-red-300 rounded hover:bg-red-50 transition-colors"
                    title="删除媒体文件"
                  >
                    🗑️ 删除
                  </button>
                  <button
                    onClick={() => setSelectedMediaItem(null)} // Renamed state setter
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {selectedMediaItem.mediaType === 'IMAGE' ? (
                  <Image
                    src={selectedMediaItem.url}
                    alt={selectedMediaItem.title}
                    className="max-w-full max-h-full object-contain"
                    width={500}
                    height={500}
                    onError={(e) => {
                      console.error('Modal image failed to load:', selectedMediaItem.url);
                      console.error('Modal image error event:', e);
                      // Show a placeholder or error state
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                    onLoad={() => {
                      console.log('Modal image loaded successfully:', selectedMediaItem.url);
                    }}
                  />
                ) : selectedMediaItem.mediaType === 'VIDEO' ? (
                  <video
                    src={selectedMediaItem.url}
                    poster={selectedMediaItem.thumbnailUrl}
                    controls
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-2">❓</div>
                    <p className="text-gray-600">未知媒体类型</p>
                    <p className="text-sm text-gray-500">{selectedMediaItem.url}</p>
                  </div>
                )}
                {/* Error fallback for modal images */}
                <div className="hidden w-full h-full flex items-center justify-center bg-red-50">
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚠️</div>
                    <p className="text-red-600 mb-2">图片加载失败</p>
                    <p className="text-sm text-gray-500 break-all px-4">{selectedMediaItem.url}</p>
                    <button
                      onClick={() => window.open(selectedMediaItem.url, '_blank')}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      尝试在新窗口打开
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>📅 {selectedMediaItem.date}</span>
                  <span>🎂 {selectedMediaItem.age}</span>
                  {selectedMediaItem.mediaType === 'VIDEO' && selectedMediaItem.duration && (
                    <span>⏱️ {formatDuration(selectedMediaItem.duration)}</span>
                  )}
                </div>
                <p className="text-gray-700">{selectedMediaItem.description}</p>
                <div className="text-xs text-gray-500">
                  {selectedMediaItem.format && <span>Format: {selectedMediaItem.format}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Gallery */}
      <div className="space-y-8">
        {Object.entries(groupedMediaItems) // Renamed from groupedPhotos
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([month, monthItems]) => ( // Renamed from monthPhotos
          <div key={month} className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <span className="mr-2">📅</span>
              {month}
              <span className="ml-2 text-sm text-gray-500">({monthItems.length} 个媒体)</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {monthItems // Renamed from monthPhotos
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((item) => ( // Renamed from photo to item
                <div
                  key={item.id}
                  onClick={() => setSelectedMediaItem(item)} // Renamed state setter
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow relative">
                    {item.mediaType === 'IMAGE' ? (
                      <Image
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                        onError={(e) => {
                          console.error('Image failed to load:', item.url);
                          console.error('Image error event:', e);
                          // Show a placeholder or error state
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', item.url);
                        }}
                      />
                    ) : item.mediaType === 'VIDEO' ? (
                      <>
                        <Image
                          src={item.thumbnailUrl || '/placeholder-video-thumb.svg'} // Fallback thumbnail
                          alt={item.title + " thumbnail"}
                          className="w-full h-full object-cover"
                          width={500}
                          height={500}
                          onError={(e) => {
                            console.error('Video thumbnail failed to load:', item.thumbnailUrl);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity">
                          <svg className="w-12 h-12 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {item.duration && (
                           <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                            {formatDuration(item.duration)}
                          </span>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">❓</div>
                          <p className="text-xs text-gray-600 px-2">{item.title}</p>
                        </div>
                      </div>
                    )}
                    {/* Error fallback for images */}
                    <div className="hidden w-full h-full flex items-center justify-center bg-red-50">
                      <div className="text-center">
                        <div className="text-2xl mb-2">⚠️</div>
                        <p className="text-xs text-red-600 px-2">图片加载失败</p>
                        <p className="text-xs text-gray-500 px-2 mt-1">{item.title}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.date}</span>
                      <span>{item.age}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {mediaItems.length === 0 && ( // Renamed from photos
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📸🎬</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">还没有上传任何媒体</h3>
          <p className="text-gray-600 mb-4">开始记录宝宝的珍贵时刻吧！</p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="btn-primary"
          >
            上传第一个文件
          </button>
        </div>
      )}
    </div>
  )
} 