'use client'

import { PortfolioProvider } from './context/PortfolioContext'

export function Providers({ children, initialData }: { children: React.ReactNode, initialData?: any }) {
  return (
    <PortfolioProvider initialData={initialData}>
      {children}
    </PortfolioProvider>
  )
}
