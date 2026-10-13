import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/app/lib/supabase/types'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card group block overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {post.cover_image && (
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="blog-card-content">
        <div className="blog-meta">
          <span className="font-mono">{date}</span>
          <span>·</span>
          <span>{post.reading_time} min read</span>
        </div>

        <h2 className="font-heading text-xl font-bold mb-2 group-hover:text-[var(--violet)] transition-colors line-clamp-2">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="muted-copy text-sm leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="blog-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
