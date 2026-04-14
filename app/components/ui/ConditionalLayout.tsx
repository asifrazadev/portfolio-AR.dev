'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '../navbar/Navbar'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if current path is admin route
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div className="px-3 md:px-6 lg:px-10">
        {children}
      </div>
    </>
  )
}