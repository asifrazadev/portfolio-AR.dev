import { createClient } from '@/app/lib/supabase/client'
import { BlogCard } from '@/app/components/blog/BlogCard'
import Link from 'next/link'
import { ArrowRightIcon } from '@/app/components/ui/ClientIcons'
import { BlogPost } from '@/app/lib/supabase/types'

export async function RecentBlogs() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-24" id="blog">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-4 block">Latest Writing</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Recent Blog Posts</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thoughts, tutorials and deep-dives on software engineering, React, Next.js, and building great products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post:BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            View All Posts
            <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}