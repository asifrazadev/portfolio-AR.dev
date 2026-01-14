'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../footer/footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if current path is admin route
  const isAdminRoute = pathname?.startsWith('/admin')
  
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
    </>
  )
}