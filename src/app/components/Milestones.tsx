'use client'

import { useState } from 'react'
import { useBaby } from '@/hooks/useBaby'
import { useMilestones } from '@/hooks/useMilestones'
import { useToastContext } from '@/components/providers/ToastProvider'

interface Milestone {
  id: string
  date: string
  title: string
  description?: string
  tags: string[]
}

export default function Milestones() {
  const { baby } = useBaby()
  const { milestones, loading, error, createMilestone, updateMilestone, deleteMilestone } = useMilestones(baby?.id)
  const toast = useToastContext()
  
  const [showForm, setShowForm] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: '',
    tags: ''
  })

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      description: '',
      tags: ''
    })
    setEditingMilestone(null)
    setShowForm(false)
  }

  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error('验证失败', '请填写标题')
      return
    }

    if (!baby?.id) {
      toast.error('验证失败', '请先创建宝宝信息')
      return
    }

    try {
      const milestoneData = {
        babyId: baby.id,
        date: formData.date,
        title: formData.title,
        ...(formData.description && { description: formData.description }),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      }

      if (editingMilestone) {
        await updateMilestone(editingMilestone.id, milestoneData)
        toast.success('更新成功', '里程碑已成功更新')
      } else {
        await createMilestone(milestoneData)
        toast.success('添加成功', '里程碑已成功添加')
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving milestone:', error)
      const errorMessage = error instanceof Error ? error.message : '操作失败，请重试'
      toast.error('保存失败', errorMessage)
    }
  }

  const handleEdit = (milestone: Milestone) => {
    setEditingMilestone(milestone)
    setFormData({
      date: milestone.date.split('T')[0],
      title: milestone.title,
      description: milestone.description || '',
      tags: milestone.tags.join(', ')
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个里程碑吗？')) return
    
    try {
      await deleteMilestone(id)
      toast.success('删除成功', '里程碑已成功删除')
    } catch (error) {
      console.error('Error deleting milestone:', error)
      const errorMessage = error instanceof Error ? error.message : '删除失败，请重试'
      toast.error('删除失败', errorMessage)
    }
  }

  const calculateAge = (date: string) => {
    if (!baby?.birthDate) return '未知'
    
    const birth = new Date(baby.birthDate)
    const milestoneDate = new Date(date)
    const diffTime = Math.abs(milestoneDate.getTime() - birth.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1 // 减去1天，不计算刚出生那天
    
    if (diffDays <= 0) {
      return '出生当天'
    } else if (diffDays < 30) {
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

  // 获取所有使用的标签
  const allTags = [...new Set(milestones.flatMap(m => m.tags))]

  // 获取标签统计
  const getTagStats = () => {
    const tagCounts: Record<string, number> = {}
    milestones.forEach(milestone => {
      milestone.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6)
      .map(([tag, count]) => ({ tag, count }))
  }

  // 处理点击已存在标签
  const handleTagClick = (tag: string) => {
    const currentTags = formData.tags.split(',').map(t => t.trim()).filter(t => t)
    
    // 检查标签是否已存在
    if (currentTags.includes(tag)) {
      return // 如果已存在，不重复添加
    }

    // 添加标签
    const newTags = currentTags.length > 0 ? `${formData.tags}, ${tag}` : tag
    setFormData(prev => ({ ...prev, tags: newTags }))
  }

  // 获取当前输入的标签列表，用于判断标签是否已被选中
  const getCurrentTags = () => {
    return formData.tags.split(',').map(t => t.trim()).filter(t => t)
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

      {/* Tag Statistics */}
      {allTags.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">热门标签</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {getTagStats().map(({ tag, count }) => (
              <div key={tag} className="text-center p-1 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl mb-1">🏷️</div>
                <div className="text-sm text-gray-600 mb-1">{tag}</div>
                <div className="text-sm font-bold text-purple-600">{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-sm text-gray-600 mb-1">总里程碑</div>
          <div className="text-2xl font-bold text-purple-600">{milestones.length}</div>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">🏷️</div>
          <div className="text-sm text-gray-600 mb-1">标签</div>
          <div className="text-2xl font-bold text-blue-600">{allTags.length}</div>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-sm text-gray-600 mb-1">最近记录</div>
          <div className="text-2xl font-bold text-green-600">
            {milestones[0] ? new Date(milestones[0].date).toLocaleDateString('zh-CN') : '-'}
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标签 (用逗号分隔)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="input-field"
                  placeholder="例: 运动发展, 翻身, 里程碑"
                />
                <p className="text-xs text-gray-500 mt-1">
                  常用标签: 运动发展, 语言发展, 社交发展, 认知发展, 生活自理
                </p>

                {/* 已存在的标签 */}
                {allTags.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">点击下方标签快速添加：</p>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {allTags.map((tag) => {
                        const isSelected = getCurrentTags().includes(tag)
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            disabled={isSelected}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                              isSelected
                                ? 'bg-purple-200 text-purple-800 cursor-not-allowed opacity-50'
                                : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700 cursor-pointer'
                            }`}
                          >
                            #{tag} {isSelected && '✓'}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
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
            {milestones.map((milestone) => (
              <div key={milestone.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
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
                    
                    {milestone.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {milestone.description}
                      </p>
                    )}

                    {milestone.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {milestone.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 