'use client'

import { useState, useEffect } from 'react'
import { useBaby } from '@/hooks/useBaby'
import { useGrowthRecords } from '@/hooks/useGrowthRecords'
import { useMilestones } from '@/hooks/useMilestones'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DashboardProps {
  setActiveTab: (tab: string) => void
}

export default function Dashboard({ setActiveTab }: DashboardProps) {
  const { baby, loading: babyLoading } = useBaby()
  const { records, loading: recordsLoading } = useGrowthRecords(baby?.id)
  const { milestones, loading: milestonesLoading } = useMilestones(baby?.id)

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

  // Prepare chart data
  const chartData = records?.map(record => ({
    date: new Date(record.date).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }),
    fullDate: record.date,
    体重: record.weight || null,
    身高: record.height || null,
  })).reverse() || [] // 反转数组以按时间正序显示

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
        <p className="text-gray-600 mb-6">开始记录宝宝的成长足迹吧！</p>
        <button 
          onClick={() => setActiveTab('baby')}
          className="btn-primary"
        >
          添加宝宝信息
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 统一的顶部卡片网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {/* 宝宝信息卡片 - 占据更多空间 */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="card p-6 h-full bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 min-h-[140px]">
              <div className="flex items-center space-x-4 h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl flex-shrink-0">
                  {baby.gender === 'boy' ? '👦' : '👧'}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-bold text-gray-800 truncate mb-1">{baby.name}</h1>
                  <p className="text-gray-600 text-base mb-1">{currentAge}</p>
                  <p className="text-sm text-gray-500 truncate mb-2">
                    出生于 {new Date(baby.birthDate).toLocaleDateString()}
                  </p>
                  <button 
                    onClick={() => setActiveTab('baby')}
                    className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                  >
                    编辑信息 →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 体重卡片 */}
          <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 min-h-[140px]">
            <div className="flex flex-col items-center text-center h-full justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl mb-3">
                ⚖️
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">当前体重</h3>
              <p className="text-base font-bold text-gray-800">{latestRecord?.weight ? `${latestRecord.weight} kg` : '暂无数据'}</p>
            </div>
          </div>

          {/* 身高卡片 */}
          <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 min-h-[140px]">
            <div className="flex flex-col items-center text-center h-full justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-xl mb-3">
                📏
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">当前身高</h3>
              <p className="text-base font-bold text-gray-800">{latestRecord?.height ? `${latestRecord.height} cm` : '暂无数据'}</p>
            </div>
          </div>

          {/* 里程碑数卡片 */}
          <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 min-h-[140px]">
            <div className="flex flex-col items-center text-center h-full justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl mb-3">
                🏆
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">里程碑数</h3>
              <p className="text-base font-bold text-gray-800">{milestones?.length || 0} 个</p>
            </div>
          </div>
        </div>

        {/* 下方左右布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左下角：最近里程碑 */}
          <div className="card p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 min-h-[400px]">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🏆</span>
              最近里程碑
            </h3>
            {milestonesLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-3"></div>
                <p className="text-base text-gray-600">加载中...</p>
              </div>
            ) : recentMilestones.length > 0 ? (
              <div className="space-y-3 mb-4 flex-1">
                {recentMilestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-white/50">
                    <span className="text-2xl">🎯</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-base mb-1">{milestone.title}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(milestone.date).toLocaleDateString()}
                      </p>
                      {milestone.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {milestone.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs bg-amber-200/70 text-amber-800 px-2 py-1 rounded-full">
                              #{tag}
                            </span>
                          ))}
                          {milestone.tags.length > 3 && (
                            <span className="text-xs text-gray-500 px-2 py-1">+{milestone.tags.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 flex-1 flex flex-col justify-center">
                <span className="text-4xl mb-4 block">🏆</span>
                <p className="text-base mb-2">还没有记录里程碑</p>
                <p className="text-sm text-gray-400">记录宝宝的重要成长时刻</p>
              </div>
            )}
            <button 
              onClick={() => setActiveTab('milestones')}
              className="w-full btn-primary bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 py-3"
            >
              {recentMilestones.length > 0 ? '查看全部里程碑' : '记录第一个里程碑'}
            </button>
          </div>

          {/* 右下角：成长记录图表 */}
          <div className="card p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 min-h-[400px] flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📈</span>
              成长趋势图表
            </h3>
            {chartData.length > 0 ? (
              <>
                <div className="h-72 bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/50">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        stroke="#9ca3af"
                      />
                      <YAxis 
                        yAxisId="weight"
                        orientation="left"
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        stroke="#9ca3af"
                        label={{ value: '体重(kg)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#6b7280' } }}
                      />
                      <YAxis 
                        yAxisId="height"
                        orientation="right"
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        stroke="#9ca3af"
                        label={{ value: '身高(cm)', angle: 90, position: 'insideRight', style: { fontSize: '12px', fill: '#6b7280' } }}
                      />
                      <Tooltip 
                        labelFormatter={(label) => `日期: ${label}`}
                        formatter={(value: any, name: string) => [
                          value ? `${value} ${name === '体重' ? 'kg' : 'cm'}` : '无数据',
                          name
                        ]}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '14px' }} />
                      <Line
                        yAxisId="weight"
                        type="monotone"
                        dataKey="体重"
                        stroke="#0891b2"
                        strokeWidth={3}
                        dot={{ fill: '#0891b2', strokeWidth: 2, r: 5 }}
                        connectNulls={false}
                      />
                      <Line
                        yAxisId="height"
                        type="monotone"
                        dataKey="身高"
                        stroke="#059669"
                        strokeWidth={3}
                        dot={{ fill: '#059669', strokeWidth: 2, r: 5 }}
                        connectNulls={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => setActiveTab('growth')}
                    className="btn-primary bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 px-6 py-3"
                  >
                    查看详细记录
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 text-center py-12 bg-white/70 backdrop-blur-sm rounded-lg border border-white/50 flex flex-col justify-center">
                  <span className="text-4xl mb-4 block">📊</span>
                  <p className="text-gray-600 text-base mb-2">还没有成长记录</p>
                  <p className="text-sm text-gray-500 mb-4">添加至少2条记录查看趋势</p>
                </div>
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => setActiveTab('growth')}
                    className="btn-primary bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 px-6 py-3"
                  >
                    添加成长记录
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 