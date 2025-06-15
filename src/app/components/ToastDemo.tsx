'use client'

import { useToastContext } from '@/components/providers/ToastProvider'

export default function ToastDemo() {
  const toast = useToastContext()

  const showSuccessToast = () => {
    toast.success('操作成功', '您的操作已成功完成！')
  }

  const showErrorToast = () => {
    toast.error('操作失败', '出现了一些错误，请稍后重试。')
  }

  const showWarningToast = () => {
    toast.warning('警告', '这是一个警告消息。')
  }

  const showInfoToast = () => {
    toast.info('信息提示', '这是一个普通的信息通知。')
  }

  const showLongToast = () => {
    toast.info('长时间通知', '这个通知会显示15秒', { duration: 15000 })
  }

  const showActionToast = () => {
    toast.addToast(
      'info',
      '需要确认',
      '您确定要执行此操作吗？',
      {
        duration: 10000,
        action: {
          label: '确认',
          onClick: () => {
            toast.success('已确认', '操作已执行')
          }
        }
      }
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Toast 通知系统演示</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={showSuccessToast}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          成功通知
        </button>
        <button
          onClick={showErrorToast}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          错误通知
        </button>
        <button
          onClick={showWarningToast}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          警告通知
        </button>
        <button
          onClick={showInfoToast}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          信息通知
        </button>
        <button
          onClick={showLongToast}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          长时间通知
        </button>
        <button
          onClick={showActionToast}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          带操作通知
        </button>
      </div>
    </div>
  )
} 