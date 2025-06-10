'use client'

import { useState } from 'react'
import { useBaby } from '@/hooks/useBaby'
import { useMilestones } from '@/hooks/useMilestones'

interface Milestone {
  id: string
  date: string
  title: string
  description: string
  category: string
}

const categories = [
  { id: 'motor', name: '运动发展', icon: '🏃', color: 'bg-blue-50 text-blue-600' },
  { id: 'language', name: '语言发展', icon: '🗣️', color: 'bg-green-50 text-green-600' },
  { id: 'social', name: '社交发展', icon: '👥', color: 'bg-purple-50 text-purple-600' },
  { id: 'cognitive', name: '认知发展', icon: '🧠', color: 'bg-orange-50 text-orange-600' },
  { id: 'self_care', name: '生活自理', icon: '🍽️', color: 'bg-pink-50 text-pink-600' }
]

export default function Milestones() {
  const { baby } = useBaby()
  const { milestones, loading, error, createMilestone, updateMilestone, deleteMilestone } = useMilestones(baby?.id)
  
  const [showForm, setShowForm] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: '',
    category: 'motor'
  })

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      description: '',
      category: 'motor'
    })
    setEditingMilestone(null)
    setShowForm(false)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      alert('请填写标题和描述')
      return
    }

    if (!baby?.id) {
      alert('请先创建宝宝信息')
      return
    }

    try {
      const milestoneData = {
        babyId: baby.id,
        date: formData.date,
        title: formData.title,
        description: formData.description,
        category: formData.category,
      }

      if (editingMilestone) {
        await updateMilestone(editingMilestone.id, milestoneData)
        alert('里程碑已更新！')
      } else {
        await createMilestone(milestoneData)
        alert('里程碑已添加！')
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving milestone:', error)
      alert('保存失败，请重试')
    }
  }

  const handleEdit = (milestone: Milestone) => {
    setEditingMilestone(milestone)
    setFormData({
      date: milestone.date.split('T')[0],
      title: milestone.title,
      description: milestone.description,
      category: milestone.category
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个里程碑吗？')) return
    
    try {
      await deleteMilestone(id)
      alert('里程碑已删除！')
    } catch (error) {
      console.error('Error deleting milestone:', error)
      alert('删除失败，请重试')
    }
  }

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0]
  }

  const getCategoryStats = () => {
    return categories.map(category => ({
      ...category,
      count: milestones.filter(m => m.category === category.id).length
    }))
  }

  const calculateAge = (date: string) => {
    if (!baby?.birthDate) return '未知'
    
    const birth = new Date(baby.birthDate)
    const milestoneDate = new Date(date)
    const diffTime = Math.abs(milestoneDate.getTime() - birth.getTime())
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">发展里程碑</h2>
          <p className="text-gray-600">记录宝宝成长的重要时刻</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          添加里程碑
        </button>
      </div>

      {/* Category Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {getCategoryStats().map(category => (
          <div key={category.id} className="card text-center">
            <div className="text-3xl mb-2">{category.icon}</div>
            <div className="text-sm text-gray-600 mb-1">{category.name}</div>
            <div className="text-2xl font-bold text-gray-800">{category.count}</div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingMilestone ? '编辑里程碑' : '添加里程碑'}
            </h3>
            
            <div className="space-y-4">
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
                  类别
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="input-field"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
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
                  placeholder="例: 第一次翻身"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  描述
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field"
                  rows={4}
                  placeholder="详细描述这个里程碑..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button onClick={handleSubmit} className="btn-primary flex-1">
                {editingMilestone ? '更新里程碑' : '添加里程碑'}
              </button>
              <button onClick={resetForm} className="btn-secondary flex-1">
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Milestones Timeline */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">里程碑时间线</h3>
        {milestones.length === 0 ? (
          <div className="card text-center py-8">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">还没有里程碑记录</h3>
            <p className="text-gray-600 mb-4">记录宝宝的第一个里程碑吧</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              添加第一个里程碑
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {milestones.map((milestone, index) => {
              const categoryInfo = getCategoryInfo(milestone.category)
              return (
                <div key={milestone.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${categoryInfo.color}`}>
                          {categoryInfo.icon} {categoryInfo.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(milestone.date).toLocaleDateString('zh-CN')}
                        </span>
                        <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {calculateAge(milestone.date)}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {milestone.title}
                      </h4>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(milestone)}
                        className="text-blue-600 hover:bg-blue-100 p-2 rounded transition-colors"
                        title="编辑"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(milestone.id)}
                        className="text-red-600 hover:bg-red-100 p-2 rounded transition-colors"
                        title="删除"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
} 