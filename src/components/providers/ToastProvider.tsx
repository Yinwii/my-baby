'use client'

import React, { createContext, useContext } from 'react'
import { useToast } from '@/hooks/useToast'
import ToastContainer from '@/components/ui/ToastContainer'
import { ToastType } from '@/components/ui/Toast'

interface ToastContextType {
  success: (title: string, message?: string, options?: { duration?: number }) => string
  error: (title: string, message?: string, options?: { duration?: number }) => string
  warning: (title: string, message?: string, options?: { duration?: number }) => string
  info: (title: string, message?: string, options?: { duration?: number }) => string
  addToast: (
    type: ToastType,
    title: string,
    message?: string,
    options?: {
      duration?: number
      action?: {
        label: string
        onClick: () => void
      }
    }
  ) => string
  removeToast: (id: string) => void
  clearAllToasts: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toastMethods = useToast()

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <ToastContainer 
        toasts={toastMethods.toasts} 
        onRemove={toastMethods.removeToast} 
      />
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
} 