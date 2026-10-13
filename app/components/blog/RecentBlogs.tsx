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
    <section className="section-shell blog-section" id="blog">
      <div className="blog-intro">
        <div>
          <span className="eyebrow">Notes / Dispatches</span>
          <h2>Ideas worth<br /><em>sharing.</em></h2>
        </div>
        <p className="muted-copy">Thoughts, tutorials, and deep-dives on software engineering, React, Next.js, and building useful products.</p>
      </div>

      <div className="blog-grid">
        {posts.map((post: BlogPost) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="blog-actions">
        <Link
          href="/blog"
          className="button-secondary inline-flex items-center gap-2 group"
        >
          See all
          <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}