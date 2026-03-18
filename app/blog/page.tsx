import type { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import { getPublishedPosts } from '@/lib/notion'

export const revalidate = 3600 // ISR: 1 hour

export const metadata: Metadata = {
  title: '文章',
  description: 'AI 趨勢 × 自動化教學',
}

export default async function BlogPage() {
  const posts = await getPublishedPosts().catch(() => [])

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-display text-base text-primary tracking-widest uppercase mb-3">
            文章
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            所有文章
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-lg">
            AI 趨勢 × 自動化教學
          </p>
        </div>

        {/* Article list */}
        <div className="divide-y divide-border">
          {posts.length === 0 ? (
            <p className="font-body text-muted-foreground py-8">文章即將發布，敬請期待</p>
          ) : (
            posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
