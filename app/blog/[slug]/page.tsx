import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import NotionRenderer from '@/components/NotionRenderer'
import { getPostBySlug, getPostContent, getAllPostSlugs } from '@/lib/notion'

export const revalidate = 3600 // ISR: 1 hour

interface Props {
  params: Promise<{ slug: string }>
}

// Pre-render known slugs at build time; falls back to on-demand ISR if Notion is unavailable
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, content] = await Promise.all([
    getPostBySlug(slug),
    getPostBySlug(slug).then((p) => (p ? getPostContent(p.id) : '')),
  ])

  if (!post) notFound()

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-display text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回文章列表
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          {post.category && (
            <span className="font-display text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-sm uppercase tracking-wider">
              {post.category}
            </span>
          )}
          {post.publishedDate && (
            <span className="font-display text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.publishedDate).toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.15] mb-8">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="font-display text-base text-muted-foreground leading-relaxed mb-12 border-l-4 border-primary pl-5">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <NotionRenderer content={content} />
      </div>
    </div>
  )
}
