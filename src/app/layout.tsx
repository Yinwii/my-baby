import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/components/providers/ToastProvider'

export const metadata: Metadata = {
  title: '小樱桃',
  description: '记录宝宝成长的美好时刻',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
