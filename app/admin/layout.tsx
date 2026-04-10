'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  HouseIcon, 
  BriefcaseIcon, 
  TrendUpIcon, 
  StackIcon, 
  UserIcon, 
  ArrowSquareOutIcon, 
  SignOutIcon,
  ArticleIcon,
} from '@phosphor-icons/react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: HouseIcon },
    { href: '/admin/projects', label: 'Projects', icon: BriefcaseIcon },
    { href: '/admin/blog', label: 'Blog', icon: ArticleIcon },
    { href: '/admin/experience', label: 'Experience', icon: TrendUpIcon },
    { href: '/admin/skills', label: 'Skills', icon: StackIcon },
    { href: '/admin/about', label: 'About', icon: UserIcon },
  ]

  // If login page, render children without header/sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/5 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center font-heading font-bold text-sm text-black">
            AR
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold">Admin Panel</h1>
            {user && <p className="text-xs text-gray-400">{user.email}</p>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowSquareOutIcon size={18} />
            <span>View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2"
          >
            <SignOutIcon size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-white text-black'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <item.icon size={20} className="text-xl" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
