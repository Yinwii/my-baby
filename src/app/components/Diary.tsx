'use client'

import { useState } from 'react'
import { useBaby } from '@/hooks/useBaby'
import { useDiaryEntries } from '@/hooks/useDiaryEntries'

interface DiaryEntry {
  id: string
  date: string
  title: string
  content: string
  mood: string
  tags: string[]
  weather?: string
}

const moods = {
  happy: { label: '开心', icon: '😊', color: 'bg-yellow-100 text-yellow-600' },
  excited: { label: '兴奋', icon: '🤩', color: 'bg-orange-100 text-orange-600' },
  proud: { label: '骄傲', icon: '🥰', color: 'bg-pink-100 text-pink-600' },
  tired: { label: '疲惫', icon: '😴', color: 'bg-blue-100 text-blue-600' },
  worried: { label: '担心', icon: '😟', color: 'bg-gray-100 text-gray-600' },
  peaceful: { label: '平静', icon: '😌', color: 'bg-green-100 text-green-600' }
}

const weathers = {
  sunny: { label: '晴天', icon: '☀️' },
  cloudy: { label: '多云', icon: '☁️' },
  rainy: { label: '雨天', icon: '🌧️' },
  snowy: { label: '雪天', icon: '❄️' }
}

export default function Diary() {
  const { baby } = useBaby()
  const { entries, loading, error, createEntry, updateEntry, deleteEntry } = useDiaryEntries(baby?.id)
  
  const [showForm, setShowForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
    mood: 'happy',
    tags: '',
    weather: 'sunny'
  })

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      content: '',
      mood: 'happy',
      tags: '',
      weather: 'sunny'
    })
    setEditingEntry(null)
    setShowForm(false)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      alert('请填写标题和内容')
      return
    }

    if (!baby?.id) {
      alert('请先创建宝宝信息')
      return
    }

    try {
      const entryData = {
        babyId: baby.id,
        date: formData.date,
        title: formData.title,
        content: formData.content,
        mood: formData.mood,
        weather: formData.weather,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      }

      if (editingEntry) {
        await updateEntry(editingEntry.id, entryData)
        alert('日记已更新！')
      } else {
        await createEntry(entryData)
        alert('日记已保存！')
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving entry:', error)
      alert('保存失败，请重试')
    }
  }

  const handleEdit = (entry: DiaryEntry) => {
    setEditingEntry(entry)
    setFormData({
      date: entry.date.split('T')[0],
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags.join(', '),
      weather: entry.weather || 'sunny'
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇日记吗？')) return
    
    try {
      await deleteEntry(id)
      alert('日记已删除！')
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('删除失败，请重试')
    }
  }

  const groupedEntries = entries.reduce((acc: Record<string, DiaryEntry[]>, entry: DiaryEntry) => {
    const month = entry.date.substring(0, 7)
    if (!acc[month]) acc[month] = []
    acc[month].push(entry)
    return acc
  }, {} as Record<string, DiaryEntry[]>)

  const allTags = [...new Set(entries.flatMap((entry: DiaryEntry) => entry.tags))]

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-red-600">加载失败: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">育儿日记</h2>
          <p className="text-gray-600">记录和宝宝一起度过的美好时光</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          写日记
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl mb-2">📝</div>
          <p className="text-sm text-gray-600 mb-1">总日记数</p>
          <p className="text-2xl font-bold text-blue-600">{entries.length}</p>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">📅</div>
          <p className="text-sm text-gray-600 mb-1">最新日记</p>
          <p className="text-2xl font-bold text-green-600">
            {entries[0] ? new Date(entries[0].date).toLocaleDateString('zh-CN') : '-'}
          </p>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">🏷️</div>
          <p className="text-sm text-gray-600 mb-1">标签数</p>
          <p className="text-2xl font-bold text-purple-600">{allTags.length}</p>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">📖</div>
          <p className="text-sm text-gray-600 mb-1">记录月份</p>
          <p className="text-2xl font-bold text-pink-600">{Object.keys(groupedEntries).length}</p>
        </div>
      </div>

      {/* Add/Edit Entry Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingEntry ? '编辑日记' : '写新日记'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    日期
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    天气
                  </label>
                  <select
                    value={formData.weather}
                    onChange={(e) => setFormData(prev => ({ ...prev, weather: e.target.value }))}
                    className="input-field"
                  >
                    {Object.entries(weathers).map(([key, weather]) => (
                      <option key={key} value={key}>
                        {weather.icon} {weather.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  心情
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(moods).map(([key, mood]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mood: key }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.mood === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{mood.icon}</div>
                      <div className="text-sm font-medium">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标题
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="input-field"
                  placeholder="给今天的日记起个标题..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  内容
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="input-field"
                  rows={6}
                  placeholder="写下今天发生的美好时光..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标签 (用逗号分隔)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="input-field"
                  placeholder="例: 成长, 里程碑, 开心"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button onClick={handleSubmit} className="btn-primary flex-1">
                {editingEntry ? '更新日记' : '保存日记'}
              </button>
              <button onClick={resetForm} className="btn-secondary flex-1">
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entries Timeline */}
      <div className="space-y-8">
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">还没有日记记录</h3>
            <p className="text-gray-600 mb-4">开始记录和宝宝的美好时光吧！</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              写第一篇日记
            </button>
          </div>
        ) : (
          Object.entries(groupedEntries)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([month, monthEntries]) => (
            <div key={month} className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <span className="mr-2">📅</span>
                {month}
              </h3>
              
              <div className="space-y-4">
                {monthEntries
                  .sort((a: DiaryEntry, b: DiaryEntry) => b.date.localeCompare(a.date))
                  .map((entry: DiaryEntry) => {
                    const mood = moods[entry.mood as keyof typeof moods]
                    const weather = entry.weather ? weathers[entry.weather as keyof typeof weathers] : null
                    return (
                      <div key={entry.id} className="card hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${mood.color}`}>
                              {mood.icon} {mood.label}
                            </span>
                            {weather && (
                              <span className="text-sm text-gray-500">
                                {weather.icon} {weather.label}
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              {new Date(entry.date).toLocaleDateString('zh-CN')}
                            </span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(entry)}
                              className="text-blue-600 hover:bg-blue-100 p-2 rounded transition-colors"
                              title="编辑"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="text-red-600 hover:bg-red-100 p-2 rounded transition-colors"
                              title="删除"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-800 mb-2">{entry.title}</h4>
                        <p className="text-gray-600 mb-3 leading-relaxed">{entry.content}</p>
                        
                        {entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map((tag: string, index: number) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 