'use client'

import { useState, useEffect } from 'react'
import { useBaby } from '@/hooks/useBaby'
import { useGrowthRecords } from '@/hooks/useGrowthRecords'
import { useMilestones } from '@/hooks/useMilestones'
import { useDiaryEntries } from '@/hooks/useDiaryEntries'

export default function Dashboard() {
  const { baby, loading: babyLoading } = useBaby()
  const { records, loading: recordsLoading } = useGrowthRecords(baby?.id)
  const { milestones, loading: milestonesLoading } = useMilestones(baby?.id)
  const { entries, loading: entriesLoading } = useDiaryEntries(baby?.id)

  const [currentAge, setCurrentAge] = useState('')

  // Calculate age when baby data is available
  useEffect(() => {
    if (baby?.birthDate) {
      const birth = new Date(baby.birthDate)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - birth.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays <= 30) {
        setCurrentAge(`${diffDays}天`)
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30)
        const days = diffDays % 30
        setCurrentAge(`${months}个月${days}天`)
      } else {
        const years = Math.floor(diffDays / 365)
        const months = Math.floor((diffDays % 365) / 30)
        setCurrentAge(`${years}岁${months}个月`)
      }
    }
  }, [baby?.birthDate])

  // Get latest growth record
  const latestRecord = records?.[0] // Records are sorted by date desc
  
  // Get recent milestones (latest 3)
  const recentMilestones = milestones?.slice(0, 3) || []

  const quickStats = [
    {
      title: '当前体重',
      value: latestRecord?.weight ? `${latestRecord.weight} kg` : '暂无数据',
      icon: '⚖️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: '当前身高',
      value: latestRecord?.height ? `${latestRecord.height} cm` : '暂无数据',
      icon: '📏',
      color: 'from-green-500 to-green-600'
    },
    {
      title: '里程碑数',
      value: `${milestones?.length || 0} 个`,
      icon: '🏆',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: '年龄',
      value: currentAge || '计算中...',
      icon: '🎂',
      color: 'from-pink-500 to-pink-600'
    }
  ]

  const additionalStats = [
    {
      title: '成长记录',
      value: `${records?.length || 0} 条`,
      icon: '📊',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: '日记条目',
      value: `${entries?.length || 0} 篇`,
      icon: '📝',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: '最新记录',
      value: latestRecord ? new Date(latestRecord.date).toLocaleDateString() : '暂无',
      icon: '📅',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: '头围',
      value: latestRecord?.headCircumference ? `${latestRecord.headCircumference} cm` : '暂无数据',
      icon: '🧠',
      color: 'from-cyan-500 to-cyan-600'
    }
  ]

  if (babyLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!baby) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">👶</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">欢迎使用宝宝成长记录</h2>
        <p className="text-gray-600 mb-6">请先添加宝宝信息开始记录成长历程</p>
        <button 
          onClick={() => window.location.href = '/?tab=baby-info'}
          className="btn-primary"
        >
          添加宝宝信息
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-4 rounded-full">
          <span className="text-4xl">👶</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{baby.name}</h2>
            <p className="text-gray-600">
              出生于 {new Date(baby.birthDate).toLocaleDateString()}
              {baby.birthTime && ` ${baby.birthTime}`}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="card">
            <div className={`flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-sm opacity-90">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {additionalStats.map((stat, index) => (
          <div key={index} className="card">
            <div className={`flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-sm opacity-90">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Milestones */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            最新里程碑
          </h3>
          {milestonesLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">加载中...</p>
            </div>
          ) : recentMilestones.length > 0 ? (
            <div className="space-y-3">
              {recentMilestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">
                    {milestone.category === 'motor' && '🏃'}
                    {milestone.category === 'language' && '🗣️'}
                    {milestone.category === 'social' && '👥'}
                    {milestone.category === 'cognitive' && '🧠'}
                    {milestone.category === 'self_care' && '🍽️'}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{milestone.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(milestone.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-2 block">🏆</span>
              <p>还没有记录里程碑</p>
              <p className="text-sm mt-1">点击下方按钮开始记录</p>
            </div>
          )}
          <button 
            onClick={() => window.location.href = '/?tab=milestones'}
            className="w-full mt-4 btn-secondary"
          >
            {recentMilestones.length > 0 ? '查看全部里程碑' : '记录第一个里程碑'}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            快速操作
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => window.location.href = '/?tab=growth-record'}
              className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all duration-200"
            >
              <span className="text-2xl">📊</span>
              <span className="text-sm font-medium text-gray-700">记录成长</span>
            </button>
            <button 
              onClick={() => window.location.href = '/?tab=milestones'}
              className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-md transition-all duration-200"
            >
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-medium text-gray-700">新里程碑</span>
            </button>
            <button 
              onClick={() => window.location.href = '/?tab=photo-gallery'}
              className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-all duration-200"
            >
              <span className="text-2xl">📸</span>
              <span className="text-sm font-medium text-gray-700">上传照片</span>
            </button>
            <button 
              onClick={() => window.location.href = '/?tab=diary'}
              className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg hover:shadow-md transition-all duration-200"
            >
              <span className="text-2xl">📝</span>
              <span className="text-sm font-medium text-gray-700">写日记</span>
            </button>
          </div>
        </div>
      </div>

      {/* Growth Trend Summary */}
      {records && records.length > 1 && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            成长趋势
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Weight Trend */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">体重变化</span>
                <span className="text-2xl">⚖️</span>
              </div>
              {records.length >= 2 && records[0]?.weight && records[1]?.weight && (
                <div className="text-sm text-blue-700">
                  {(() => {
                    const latest = records[0].weight!
                    const previous = records[1].weight!
                    const change = latest - previous
                    const changeKg = change.toFixed(1)
                    return (
                      <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {change >= 0 ? '+' : ''}{changeKg} kg
                      </span>
                    )
                  })()}
                </div>
              )}
              {(!records[0]?.weight || !records[1]?.weight) && records.length >= 2 && (
                <div className="text-sm text-gray-500">
                  缺少体重数据
                </div>
              )}
            </div>

            {/* Height Trend */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">身高变化</span>
                <span className="text-2xl">📏</span>
              </div>
              {records.length >= 2 && records[0]?.height && records[1]?.height && (
                <div className="text-sm text-green-700">
                  {(() => {
                    const latest = records[0].height!
                    const previous = records[1].height!
                    const change = latest - previous
                    return (
                      <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {change >= 0 ? '+' : ''}{change} cm
                      </span>
                    )
                  })()}
                </div>
              )}
              {(!records[0]?.height || !records[1]?.height) && records.length >= 2 && (
                <div className="text-sm text-gray-500">
                  缺少身高数据
                </div>
              )}
            </div>

            {/* Records Count */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-800">记录次数</span>
                <span className="text-2xl">📊</span>
              </div>
              <div className="text-sm text-purple-700">
                总计 {records.length} 次记录
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/?tab=growth-record'}
            className="w-full mt-4 btn-secondary"
          >
            查看详细趋势
          </button>
        </div>
      )}

      {/* Empty State for Growth Records */}
      {records && records.length === 0 && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            成长趋势
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg text-center">
            <span className="text-4xl mb-4 block">📊</span>
            <p className="text-gray-600 mb-4">还没有成长记录</p>
            <p className="text-sm text-gray-500 mb-4">开始记录宝宝的体重、身高等数据，查看成长趋势</p>
            <button 
              onClick={() => window.location.href = '/?tab=growth-record'}
              className="btn-primary"
            >
              添加第一条成长记录
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 