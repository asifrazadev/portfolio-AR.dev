import { notFound } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'
import type { Metadata } from 'next'
import type { BlogPost } from '@/app/lib/supabase/types'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon } from '@/app/components/ui/ClientIcons'
import { BlogContent } from '@/app/components/blog/BlogContent'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error || !data) return null
  return data
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | Asif Raza`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      url: `https://asifraza.site/blog/${post.slug}`,
      type: "article",
      images: post.cover_image
        ? [
          {
            url: post.cover_image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm group"
      >
        <ArrowLeftIcon size={18} className="group-hover:-translate-x-1 transition-transform" />
        All Posts
      </Link>

      {/* Header */}
      <header className="mb-12">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>

        {post.excerpt && (
          <p className="text-xl text-gray-400 leading-relaxed mb-8">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center font-heading font-bold text-xs text-black">
              AR
            </div>
            <span className="text-gray-300 font-medium">Asif Raza</span>
          </div>
          <span>·</span>
          <span>{date}</span>
          <span>·</span>
          <span>{post.reading_time} min read</span>
        </div>
      </header>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-contain"
            priority
          />
        </div>
      )}

      {/* Content */}
      {post.content && (
        <article className="prose-blog">
          <BlogContent content={post.content as Record<string, unknown>} />
        </article>
      )}

      {/* Footer */}
      <div className="mt-16 pt-10 border-t border-white/10 text-center">
        <p className="text-gray-500 text-sm mb-4">Thanks for reading!</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors"
        >
          <ArrowLeftIcon size={16} />
          Back to all posts
        </Link>
      </div>
    </main>
  )
}
