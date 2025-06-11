'use client'

import { useState } from 'react'
import { useBaby } from '@/hooks/useBaby'
import { useGrowthRecords } from '@/hooks/useGrowthRecords'

interface GrowthEntry {
  id: string
  date: string
  weight?: number
  height?: number
  headCircumference?: number
  notes?: string
}

export default function GrowthRecord() {
  const { baby } = useBaby()
  const { records, loading, error, createRecord, updateRecord, deleteRecord } = useGrowthRecords(baby?.id)
  
  const [showForm, setShowForm] = useState(false)
  const [editingRecord, setEditingRecord] = useState<GrowthEntry | null>(null)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    height: '',
    headCircumference: '',
    notes: ''
  })

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      height: '',
      headCircumference: '',
      notes: ''
    })
    setEditingRecord(null)
    setShowForm(false)
  }

  const handleSubmit = async () => {
    if (!formData.date) {
      alert('请选择记录日期')
      return
    }

    if (!baby?.id) {
      alert('请先创建宝宝信息')
      return
    }

    try {
      const recordData = {
        babyId: baby.id,
        date: formData.date,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        headCircumference: formData.headCircumference ? parseFloat(formData.headCircumference) : undefined,
        notes: formData.notes || undefined,
      }

      if (editingRecord) {
        await updateRecord(editingRecord.id, recordData)
        alert('成长记录已更新！')
      } else {
        await createRecord(recordData)
        alert('成长记录已添加！')
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving record:', error)
      alert('保存失败，请重试')
    }
  }

  const handleEdit = (record: GrowthEntry) => {
    setEditingRecord(record)
    setFormData({
      date: record.date.split('T')[0],
      weight: record.weight?.toString() || '',
      height: record.height?.toString() || '',
      headCircumference: record.headCircumference?.toString() || '',
      notes: record.notes || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条成长记录吗？')) return
    
    try {
      await deleteRecord(id)
      alert('成长记录已删除！')
    } catch (error) {
      console.error('Error deleting record:', error)
      alert('删除失败，请重试')
    }
  }

  const calculateAge = (date: string) => {
    if (!baby?.birthDate) return '未知'
    
    const birth = new Date(baby.birthDate)
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

  const getGrowthTrend = (current: number, previous: number) => {
    if (previous === 0) return { icon: '➖', color: 'text-gray-500' }
    const diff = current - previous
    if (diff > 0) return { icon: '📈', color: 'text-green-500' }
    if (diff < 0) return { icon: '📉', color: 'text-red-500' }
    return { icon: '➖', color: 'text-gray-500' }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">成长记录</h2>
          <p className="text-gray-600">记录宝宝的身体发育数据</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          添加记录
        </button>
      </div>

      {/* Statistics Cards */}
      {records.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">⚖️</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">最新体重</p>
                <p className="text-2xl font-bold text-blue-600">
                  {records[0]?.weight ? `${records[0].weight} kg` : '未记录'}
                </p>
                {records[1] && records[0]?.weight && records[1]?.weight && (
                  <div className="flex items-center space-x-1 text-sm">
                    <span className={getGrowthTrend(records[0].weight, records[1].weight).color}>
                      {getGrowthTrend(records[0].weight, records[1].weight).icon}
                    </span>
                    <span className="text-gray-500">
                      vs 上次: {(records[0].weight - records[1].weight).toFixed(1)} kg
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">📏</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">最新身高</p>
                <p className="text-2xl font-bold text-green-600">
                  {records[0]?.height ? `${records[0].height} cm` : '未记录'}
                </p>
                {records[1] && records[0]?.height && records[1]?.height && (
                  <div className="flex items-center space-x-1 text-sm">
                    <span className={getGrowthTrend(records[0].height, records[1].height).color}>
                      {getGrowthTrend(records[0].height, records[1].height).icon}
                    </span>
                    <span className="text-gray-500">
                      vs 上次: +{(records[0].height - records[1].height).toFixed(0)} cm
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">最新头围</p>
                <p className="text-2xl font-bold text-purple-600">
                  {records[0]?.headCircumference ? `${records[0].headCircumference} cm` : '未记录'}
                </p>
                {records[1] && records[0]?.headCircumference && records[1]?.headCircumference && (
                  <div className="flex items-center space-x-1 text-sm">
                    <span className={getGrowthTrend(records[0].headCircumference, records[1].headCircumference).color}>
                      {getGrowthTrend(records[0].headCircumference, records[1].headCircumference).icon}
                    </span>
                    <span className="text-gray-500">
                      vs 上次: +{(records[0].headCircumference - records[1].headCircumference).toFixed(1)} cm
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Record Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingRecord ? '编辑记录' : '添加成长记录'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  记录日期 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    体重 (kg) <span className="text-gray-400 text-xs">可选</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    className="input-field"
                    placeholder="例: 7.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    身高 (cm) <span className="text-gray-400 text-xs">可选</span>
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                    className="input-field"
                    placeholder="例: 65"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  头围 (cm) <span className="text-gray-400 text-xs">可选</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.headCircumference}
                  onChange={(e) => setFormData(prev => ({ ...prev, headCircumference: e.target.value }))}
                  className="input-field"
                  placeholder="例: 42"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  备注 <span className="text-gray-400 text-xs">可选</span>
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="input-field"
                  rows={3}
                  placeholder="记录一些备注信息..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button onClick={handleSubmit} className="btn-primary flex-1">
                {editingRecord ? '更新记录' : '添加记录'}
              </button>
              <button onClick={resetForm} className="btn-secondary flex-1">
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Records List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">历史记录</h3>
        {records.length === 0 ? (
          <div className="card text-center py-8">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">还没有成长记录</h3>
            <p className="text-gray-600 mb-4">开始记录宝宝的成长数据吧</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              添加第一条记录
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((record, index) => (
              <div key={record.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-lg font-semibold text-gray-800">
                        {new Date(record.date).toLocaleDateString('zh-CN')}
                      </span>
                      <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {calculateAge(record.date)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">体重:</span>
                        <span className="font-semibold ml-1">{record.weight ? `${record.weight} kg` : '未记录'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">身高:</span>
                        <span className="font-semibold ml-1">{record.height ? `${record.height} cm` : '未记录'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">头围:</span>
                        <span className="font-semibold ml-1">{record.headCircumference ? `${record.headCircumference} cm` : '未测量'}</span>
                      </div>
                    </div>
                    
                    {record.notes && (
                      <p className="text-sm text-gray-600 mt-2">{record.notes}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(record)}
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded transition-colors"
                      title="编辑"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
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