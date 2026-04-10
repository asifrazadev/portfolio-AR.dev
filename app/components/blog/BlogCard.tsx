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
      className="group block bg-white/3 border border-white/5 rounded-2xl overflow-hidden hover:bg-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
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
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
          <span className="font-mono">{date}</span>
          <span>·</span>
          <span>{post.reading_time} min read</span>
        </div>

        <h2 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-xs text-gray-400"
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
