'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'

export function GlobalLoader() {
  const { loading } = usePortfolio()

  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-[#050505] z-[9999] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="text-white text-lg font-heading">Loading Portfolio...</p>
      </div>
    </div>
  )
}
