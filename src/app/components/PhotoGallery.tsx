'use client'

import { useState } from 'react'

interface MediaItem { // Renamed from Photo
  id: string;
  url: string; // URL of the main media (image or video)
  date: string;
  title: string;
  description: string | null; // Made description nullable to match schema
  age: string; // This is client-calculated, will keep for now
  mediaType: 'IMAGE' | 'VIDEO'; // Added
  format?: string; // e.g., "jpeg", "mp4" - Added
  originalFormat?: string; // e.g., "heic", "mov" - Added
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


export default function PhotoGallery() { // Consider renaming to MediaGallery later if desired
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([ // Renamed from photos, updated type
    // Updated initial data to include mediaType and other relevant fields
    {
      id: '1', url: '/placeholder-baby1.jpg', date: '2024-11-15', title: '第一次翻身',
      description: '宝宝成功翻身的珍贵时刻', age: '10个月15天', mediaType: 'IMAGE',
      format: 'jpg', originalFormat: 'jpg'
    },
    {
      id: '2', url: '/placeholder-baby2.jpg', date: '2024-11-10', title: '甜美笑容',
      description: '听到爸爸说话时的开心表情', age: '10个月10天', mediaType: 'IMAGE',
      format: 'jpg', originalFormat: 'jpg'
    },
    {
      id: '3', url: '/placeholder-baby3.jpg', date: '2024-11-05', title: '玩玩具',
      description: '专注地玩摇铃玩具', age: '10个月5天', mediaType: 'IMAGE',
      format: 'jpg', originalFormat: 'jpg'
    },
    {
      id: '4', url: '/placeholder-baby4.jpg', date: '2024-10-20', title: '睡觉时光',
      description: '安静睡觉的可爱模样', age: '9个月20天', mediaType: 'IMAGE',
      format: 'jpg', originalFormat: 'jpg'
    },
    {
      id: '5', url: '/placeholder-baby5.jpg', date: '2024-10-15', title: '洗澡时间',
      description: '洗澡时开心玩水', age: '9个月15天', mediaType: 'IMAGE',
      format: 'jpg', originalFormat: 'jpg'
    },
    {
      id: '6', url: '/placeholder-baby6.jpg', date: '2024-10-01', title: '第一次尝试辅食',
      description: '尝试胡萝卜泥的表情', age: '9个月1天', mediaType: 'IMAGE',
      format: 'jpg', originalFormat: 'jpg'
    }
  ]);

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

  const calculateAge = (date: string) => { // This helper function remains the same
    const birth = new Date('2024-01-01')
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
  }

  // Renamed from handleUploadPhoto to handleUploadMediaItem
  const handleUploadMediaItem = async () => {
    if (!selectedFile) {
      alert('请选择一个文件进行上传。'); // Updated message
      setUploadError('请选择一个文件进行上传。');
      return;
    }
    if (!newMediaItemData.title) { // Updated state name
      alert('请填写标题。'); // Updated message
      setUploadError('请填写标题。');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // 1. Upload file to R2 via /api/photos/upload endpoint
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await fetch('/api/photos/upload', { // Endpoint remains the same
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || `上传文件失败 (HTTP ${uploadResponse.status})`); // Updated message
      }

      // uploadResult now contains: { url, mediaType, format, originalFormat, thumbnailUrl, duration }
      const uploadResult = await uploadResponse.json();

      // 2. Save media item metadata (including R2 URL and other details) to database via /api/photos
      const mediaDataForDb = {
        babyId: "TODO_REPLACE_WITH_ACTUAL_BABY_ID", // Placeholder for babyId
        date: newMediaItemData.date, // Updated state name
        title: newMediaItemData.title, // Updated state name
        description: newMediaItemData.description, // Updated state name
        url: uploadResult.url,
        mediaType: uploadResult.mediaType,
        format: uploadResult.format,
        originalFormat: uploadResult.originalFormat,
        thumbnailUrl: uploadResult.thumbnailUrl,
        duration: uploadResult.duration,
      };

      const saveMediaResponse = await fetch('/api/photos', { // Endpoint remains the same
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mediaDataForDb),
      });

      if (!saveMediaResponse.ok) {
        const errorData = await saveMediaResponse.json();
        throw new Error(errorData.error || `保存媒体信息失败 (HTTP ${saveMediaResponse.status})`); // Updated message
      }

      // savedMediaItem will include all fields, including id, createdAt, updatedAt from the DB
      const savedMediaItemWithId = await saveMediaResponse.json();

      // Update UI
      const finalMediaItemObject: MediaItem = { // Ensure type is MediaItem
        ...savedMediaItemWithId,
        age: calculateAge(savedMediaItemWithId.date) // Calculate age client-side
      };

      setMediaItems(prev => [finalMediaItemObject, ...prev]); // Renamed state setter

      setNewMediaItemData({ date: new Date().toISOString().split('T')[0], title: '', description: '' }); // Reset form
      setSelectedFile(null); // Clear selected file
      setShowUploadForm(false); // Close modal
      alert('文件上传成功！'); // Updated message

    } catch (error) {
      console.error('上传失败:', error);
      const errorMessage = error instanceof Error ? error.message : '发生未知错误。';
      setUploadError(errorMessage);
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
          <p className="text-2xl font-bold text-green-600">{mediaItems[0]?.date}</p>
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
                    onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
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
                <button
                  onClick={() => setSelectedMediaItem(null)} // Renamed state setter
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {selectedMediaItem.mediaType === 'IMAGE' ? (
                  <img
                    src={selectedMediaItem.url}
                    alt={selectedMediaItem.title}
                    className="max-w-full max-h-full object-contain"
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
                  {selectedMediaItem.originalFormat && <span> (Original: {selectedMediaItem.originalFormat})</span>}
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
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : item.mediaType === 'VIDEO' ? (
                      <>
                        <img
                          src={item.thumbnailUrl || '/placeholder-video-thumb.jpg'} // Fallback thumbnail
                          alt={item.title + " thumbnail"}
                          className="w-full h-full object-cover"
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