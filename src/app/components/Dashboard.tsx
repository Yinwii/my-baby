'use client'

import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [babyData, setBabyData] = useState({
    name: '小宝贝',
    birthDate: '2024-01-01',
    currentAge: '',
    latestWeight: '7.5',
    latestHeight: '65',
    photoCount: 12
  })

  useEffect(() => {
    // Calculate age
    const birth = new Date(babyData.birthDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - birth.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 30) {
      setBabyData(prev => ({ ...prev, currentAge: `${diffDays}天` }))
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      const days = diffDays % 30
      setBabyData(prev => ({ ...prev, currentAge: `${months}个月${days}天` }))
    } else {
      const years = Math.floor(diffDays / 365)
      const months = Math.floor((diffDays % 365) / 30)
      setBabyData(prev => ({ ...prev, currentAge: `${years}岁${months}个月` }))
    }
  }, [babyData.birthDate])

  const quickStats = [
    {
      title: '当前体重',
      value: `${babyData.latestWeight} kg`,
      icon: '⚖️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: '当前身高',
      value: `${babyData.latestHeight} cm`,
      icon: '📏',
      color: 'from-green-500 to-green-600'
    },
    {
      title: '照片数量',
      value: `${babyData.photoCount} 张`,
      icon: '📸',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: '年龄',
      value: babyData.currentAge,
      icon: '🎂',
      color: 'from-pink-500 to-pink-600'
    }
  ]

  const recentMilestones = [
    { date: '2024-11-15', event: '第一次翻身', icon: '🔄' },
    { date: '2024-11-10', event: '开始笑出声', icon: '😊' },
    { date: '2024-11-05', event: '能够抓握玩具', icon: '🧸' }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-4 rounded-full">
          <span className="text-4xl">👶</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{babyData.name}</h2>
            <p className="text-gray-600">出生于 {babyData.birthDate}</p>
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Milestones */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            最新里程碑
          </h3>
          <div className="space-y-3">
            {recentMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">{milestone.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{milestone.event}</p>
                  <p className="text-sm text-gray-500">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 btn-secondary">
            查看全部里程碑
          </button>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            快速操作
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-2xl">📊</span>
              <span className="text-sm font-medium text-gray-700">记录成长</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-medium text-gray-700">新里程碑</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-2xl">📸</span>
              <span className="text-sm font-medium text-gray-700">上传照片</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-2xl">📝</span>
              <span className="text-sm font-medium text-gray-700">写日记</span>
            </button>
          </div>
        </div>
      </div>

      {/* Growth Chart Preview */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📈</span>
          成长趋势
        </h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg text-center">
          <p className="text-gray-600 mb-4">这里将显示宝宝的成长曲线图</p>
          <div className="flex justify-center space-x-4">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">体重趋势</div>
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">身高趋势</div>
            <div className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm">头围趋势</div>
          </div>
        </div>
      </div>
    </div>
  )
} 