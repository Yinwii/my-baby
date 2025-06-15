'use client'

import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastProps {
  toast: ToastMessage
  onRemove: (id: string) => void
}

const Toast = ({ toast, onRemove }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const timer = setTimeout(() => {
      setIsLeaving(true)
      setTimeout(() => onRemove(toast.id), 300) // 等待退出动画完成
    }, toast.duration || 5000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onRemove])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => onRemove(toast.id), 300)
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return 'ℹ️'
    }
  }

  const getTypeStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getProgressBarColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div
      className={`
        relative max-w-sm w-full rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out
        ${getTypeStyles()}
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 text-xl mr-3">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">
            {toast.title}
          </p>
          {toast.message && (
            <p className="mt-1 text-sm opacity-90">
              {toast.message}
            </p>
          )}
          {toast.action && (
            <div className="mt-2">
              <button
                onClick={toast.action.onClick}
                className="text-sm font-medium underline hover:no-underline focus:outline-none"
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
          aria-label="关闭通知"
        >
          <span className="text-lg">×</span>
        </button>
      </div>
      
      {/* 进度条 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-10 rounded-b-lg overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-linear ${getProgressBarColor()}`}
          style={{
            width: isLeaving ? '0%' : '100%',
            transition: `width ${toast.duration || 5000}ms linear`
          }}
        />
      </div>
    </div>
  )
}

export default Toast 