'use client'

import { useState } from 'react'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import BabyInfo from './components/BabyInfo'
import GrowthRecord from './components/GrowthRecord'
import Milestones from './components/Milestones'
import PhotoGallery from './components/PhotoGallery'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />
      case 'baby':
        return <BabyInfo />
      case 'growth':
        return <GrowthRecord />
      case 'milestones':
        return <Milestones />
      case 'photos':
        return <PhotoGallery />
      default:
        return <Dashboard setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  )
}