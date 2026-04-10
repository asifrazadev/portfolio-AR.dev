import { createClient } from '@/app/lib/supabase/client'
import { BlogCard } from '@/app/components/blog/BlogCard'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeftIcon } from '@/app/components/ui/ClientIcons'
import { BlogPost } from '../lib/supabase/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | Asif Raza',
  description: 'Thoughts, tutorials and deep-dives on software engineering, React, Next.js, and modern web development.',
}

export default async function BlogPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm group"
      >
        <ArrowLeftIcon size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Portfolio
      </Link>

      <div className="mb-16">
        <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-4 block">Writing</span>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Blog</h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Thoughts, tutorials and deep-dives on software engineering, React, Next.js, and building great products.
        </p>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-24 bg-white/3 rounded-2xl border border-white/5">
          <p className="text-gray-500">No posts yet — check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post:BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
