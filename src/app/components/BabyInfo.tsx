'use client'

import { useState, useEffect } from 'react'
import { useBaby } from '@/hooks/useBaby'

export default function BabyInfo() {
  const { baby, loading, error, createBaby, updateBaby } = useBaby()
  const [isEditing, setIsEditing] = useState(false)
  const [babyInfo, setBabyInfo] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: 'boy',
    birthWeight: '',
    birthHeight: '',
    birthHeadCircumference: '',
    bloodType: '',
    allergies: '',
    notes: ''
  })

  useEffect(() => {
    if (baby) {
      setBabyInfo({
        name: baby.name || '',
        birthDate: baby.birthDate ? baby.birthDate.split('T')[0] : '',
        birthTime: baby.birthTime || '',
        gender: baby.gender || 'boy',
        birthWeight: baby.birthWeight?.toString() || '',
        birthHeight: baby.birthHeight?.toString() || '',
        birthHeadCircumference: baby.birthHeadCircumference?.toString() || '',
        bloodType: baby.bloodType || '',
        allergies: baby.allergies || '',
        notes: baby.notes || ''
      })
    } else if (!loading && !baby) {
      // No baby exists, enable editing mode to create one
      setIsEditing(true)
    }
  }, [baby, loading])

  const handleSave = async () => {
    try {
      if (baby) {
        // Update existing baby
        await updateBaby({
          id: baby.id,
          ...babyInfo,
          birthWeight: babyInfo.birthWeight ? parseFloat(babyInfo.birthWeight) : undefined,
          birthHeight: babyInfo.birthHeight ? parseFloat(babyInfo.birthHeight) : undefined,
          birthHeadCircumference: babyInfo.birthHeadCircumference ? parseFloat(babyInfo.birthHeadCircumference) : undefined,
        })
      } else {
        // Create new baby
        await createBaby({
          ...babyInfo,
          birthWeight: babyInfo.birthWeight ? parseFloat(babyInfo.birthWeight) : undefined,
          birthHeight: babyInfo.birthHeight ? parseFloat(babyInfo.birthHeight) : undefined,
          birthHeadCircumference: babyInfo.birthHeadCircumference ? parseFloat(babyInfo.birthHeadCircumference) : undefined,
        })
      }
      setIsEditing(false)
      alert('宝宝信息已保存！')
    } catch {
      alert('保存失败，请重试')
    }
  }

  const handleChange = (field: string, value: string) => {
    setBabyInfo(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
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
          <p className="text-gray-600 mt-2">
            请确保已正确配置数据库连接，并运行了数据库迁移。
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">宝宝信息</h2>
        <p className="text-gray-600">管理宝宝的基本信息</p>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">基本信息</h3>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={isEditing ? 'btn-primary' : 'btn-secondary'}
          >
            {isEditing ? '保存' : '编辑'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              宝宝姓名
            </label>
            {isEditing ? (
              <input
                type="text"
                value={babyInfo.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="input-field"
              />
            ) : (
              <p className="text-lg text-gray-800">{babyInfo.name || '未设置'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              性别
            </label>
            {isEditing ? (
              <select
                value={babyInfo.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="input-field"
              >
                <option value="boy">男孩 👦</option>
                <option value="girl">女孩 👧</option>
              </select>
            ) : (
              <p className="text-lg text-gray-800">
                {babyInfo.gender === 'boy' ? '男孩 👦' : '女孩 👧'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              出生日期
            </label>
            {isEditing ? (
              <input
                type="date"
                value={babyInfo.birthDate}
                onChange={(e) => handleChange('birthDate', e.target.value)}
                className="input-field"
              />
            ) : (
              <p className="text-lg text-gray-800">{babyInfo.birthDate || '未设置'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              出生时间
            </label>
            {isEditing ? (
              <input
                type="time"
                value={babyInfo.birthTime}
                onChange={(e) => handleChange('birthTime', e.target.value)}
                className="input-field"
              />
            ) : (
              <p className="text-lg text-gray-800">{babyInfo.birthTime || '未设置'}</p>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-6">出生数据</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl mb-2">⚖️</div>
            <div className="text-sm text-gray-600 mb-1">出生体重</div>
            {isEditing ? (
              <input
                type="number"
                step="0.1"
                value={babyInfo.birthWeight}
                onChange={(e) => handleChange('birthWeight', e.target.value)}
                className="input-field text-center"
                placeholder="kg"
              />
            ) : (
              <div className="text-2xl font-bold text-blue-600">
                {babyInfo.birthWeight ? `${babyInfo.birthWeight} kg` : '未设置'}
              </div>
            )}
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl mb-2">📏</div>
            <div className="text-sm text-gray-600 mb-1">出生身高</div>
            {isEditing ? (
              <input
                type="number"
                value={babyInfo.birthHeight}
                onChange={(e) => handleChange('birthHeight', e.target.value)}
                className="input-field text-center"
                placeholder="cm"
              />
            ) : (
              <div className="text-2xl font-bold text-green-600">
                {babyInfo.birthHeight ? `${babyInfo.birthHeight} cm` : '未设置'}
              </div>
            )}
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl mb-2">🔄</div>
            <div className="text-sm text-gray-600 mb-1">出生头围</div>
            {isEditing ? (
              <input
                type="number"
                step="0.1"
                value={babyInfo.birthHeadCircumference}
                onChange={(e) => handleChange('birthHeadCircumference', e.target.value)}
                className="input-field text-center"
                placeholder="cm"
              />
            ) : (
              <div className="text-2xl font-bold text-purple-600">
                {babyInfo.birthHeadCircumference ? `${babyInfo.birthHeadCircumference} cm` : '未设置'}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-6">健康信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              血型
            </label>
            {isEditing ? (
              <select
                value={babyInfo.bloodType}
                onChange={(e) => handleChange('bloodType', e.target.value)}
                className="input-field"
              >
                <option value="">选择血型</option>
                <option value="A">A型</option>
                <option value="B">B型</option>
                <option value="AB">AB型</option>
                <option value="O">O型</option>
              </select>
            ) : (
              <p className="text-lg text-gray-800">{babyInfo.bloodType ? `${babyInfo.bloodType}型` : '未设置'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              过敏信息
            </label>
            {isEditing ? (
              <input
                type="text"
                value={babyInfo.allergies}
                onChange={(e) => handleChange('allergies', e.target.value)}
                className="input-field"
                placeholder="如有过敏请填写"
              />
            ) : (
              <p className="text-lg text-gray-800">
                {babyInfo.allergies || '暂无过敏信息'}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            备注
          </label>
          {isEditing ? (
            <textarea
              value={babyInfo.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="关于宝宝的其他信息..."
            />
          ) : (
            <p className="text-lg text-gray-800 bg-gray-50 p-4 rounded-lg">
              {babyInfo.notes || '暂无备注'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 