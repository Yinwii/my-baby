'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Toast, { ToastMessage } from './Toast'

interface ToastContainerProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toastContainer = (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col space-y-2"
      role="region"
      aria-label="通知区域"
    >
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  )

  return createPortal(toastContainer, document.body)
}

export default ToastContainer 