'use client'

import { useState } from 'react'

interface Photo {
  id: string
  url: string
  date: string
  title: string
  description: string
  age: string
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: '/placeholder-baby1.jpg',
      date: '2024-11-15',
      title: '第一次翻身',
      description: '宝宝成功翻身的珍贵时刻',
      age: '10个月15天'
    },
    {
      id: '2',
      url: '/placeholder-baby2.jpg',
      date: '2024-11-10',
      title: '甜美笑容',
      description: '听到爸爸说话时的开心表情',
      age: '10个月10天'
    },
    {
      id: '3',
      url: '/placeholder-baby3.jpg',
      date: '2024-11-05',
      title: '玩玩具',
      description: '专注地玩摇铃玩具',
      age: '10个月5天'
    },
    {
      id: '4',
      url: '/placeholder-baby4.jpg',
      date: '2024-10-20',
      title: '睡觉时光',
      description: '安静睡觉的可爱模样',
      age: '9个月20天'
    },
    {
      id: '5',
      url: '/placeholder-baby5.jpg',
      date: '2024-10-15',
      title: '洗澡时间',
      description: '洗澡时开心玩水',
      age: '9个月15天'
    },
    {
      id: '6',
      url: '/placeholder-baby6.jpg',
      date: '2024-10-01',
      title: '第一次尝试辅食',
      description: '尝试胡萝卜泥的表情',
      age: '9个月1天'
    }
  ])

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [newPhoto, setNewPhoto] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: ''
  })

  const calculateAge = (date: string) => {
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

  const handleUploadPhoto = () => {
    if (!newPhoto.title) {
      alert('请填写照片标题')
      return
    }

    const photo: Photo = {
      id: Date.now().toString(),
      url: '/placeholder-baby-new.jpg', // In a real app, this would be the uploaded file URL
      date: newPhoto.date,
      title: newPhoto.title,
      description: newPhoto.description,
      age: calculateAge(newPhoto.date)
    }

    setPhotos(prev => [photo, ...prev])
    setNewPhoto({
      date: new Date().toISOString().split('T')[0],
      title: '',
      description: ''
    })
    setShowUploadForm(false)
    alert('照片已上传！')
  }

  const groupedPhotos = photos.reduce((acc, photo) => {
    const month = photo.date.substring(0, 7)
    if (!acc[month]) acc[month] = []
    acc[month].push(photo)
    return acc
  }, {} as Record<string, Photo[]>)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">照片墙</h2>
          <p className="text-gray-600">记录宝宝成长的珍贵时刻</p>
        </div>
        <button
          onClick={() => setShowUploadForm(true)}
          className="btn-primary"
        >
          上传照片
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl mb-2">📸</div>
          <p className="text-sm text-gray-600 mb-1">总照片数</p>
          <p className="text-2xl font-bold text-blue-600">{photos.length}</p>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">📅</div>
          <p className="text-sm text-gray-600 mb-1">最新照片</p>
          <p className="text-2xl font-bold text-green-600">{photos[0]?.date}</p>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">🎂</div>
          <p className="text-sm text-gray-600 mb-1">记录时长</p>
          <p className="text-2xl font-bold text-purple-600">
            {Object.keys(groupedPhotos).length} 个月
          </p>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">上传新照片</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择照片
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-600 mb-2">点击选择照片或拖拽到这里</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="btn-secondary cursor-pointer inline-block"
                  >
                    选择文件
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  照片日期
                </label>
                <input
                  type="date"
                  value={newPhoto.date}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, date: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  照片标题
                </label>
                <input
                  type="text"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, title: e.target.value }))}
                  className="input-field"
                  placeholder="例如：第一次笑"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  照片描述
                </label>
                <textarea
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field"
                  rows={3}
                  placeholder="描述这张照片的故事..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleUploadPhoto}
                className="btn-primary flex-1"
              >
                上传照片
              </button>
              <button
                onClick={() => setShowUploadForm(false)}
                className="btn-secondary flex-1"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedPhoto.title}</h3>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">👶</div>
                  <p className="text-gray-600">照片预览</p>
                  <p className="text-sm text-gray-500">{selectedPhoto.url}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>📅 {selectedPhoto.date}</span>
                  <span>🎂 {selectedPhoto.age}</span>
                </div>
                <p className="text-gray-700">{selectedPhoto.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery */}
      <div className="space-y-8">
        {Object.entries(groupedPhotos)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([month, monthPhotos]) => (
          <div key={month} className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <span className="mr-2">📅</span>
              {month}
              <span className="ml-2 text-sm text-gray-500">({monthPhotos.length} 张照片)</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {monthPhotos
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-gradient-to-br from-pink-100 to-blue-100 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">👶</div>
                        <p className="text-xs text-gray-600 px-2">{photo.title}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-800 truncate">{photo.title}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{photo.date}</span>
                      <span>{photo.age}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">还没有上传照片</h3>
          <p className="text-gray-600 mb-4">开始记录宝宝的珍贵时刻吧！</p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="btn-primary"
          >
            上传第一张照片
          </button>
        </div>
      )}
    </div>
  )
} 