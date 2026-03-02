import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import ArticleCard from '@/components/ArticleCard'
import CaseCard from '@/components/CaseCard'
import { getPublishedPosts, getCases } from '@/lib/notion'

export const revalidate = 3600 // ISR: revalidate every 1 hour

export const metadata: Metadata = {
  title: 'Felice Wu｜AI 工作教練 & 內容創作者',
  description: 'AI 工作教練 Felice 分享 AI 工作術、工作流程設計與知識管理技巧，幫助個人在資訊爆炸的時代打造真正用得起來的工作系統',
}

export default async function HomePage() {
  const [allPosts, allCases] = await Promise.all([
    getPublishedPosts().catch(() => []),
    getCases().catch(() => []),
  ])

  const featuredPosts = allPosts.slice(0, 3)
  const featuredCases = allCases.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Latest Articles */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <p className="font-display text-sm text-primary tracking-widest uppercase mb-3">
              文章
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  最新文章
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-lg">
                  AI 工作術與工作流程設計，每週持續更新
                </p>
              </div>
              <Link
                href="/blog"
                className="font-display text-sm text-primary hover:opacity-80 transition-opacity flex items-center gap-1 shrink-0"
              >
                查看全部 <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-border">
            {featuredPosts.length === 0 ? (
              <p className="font-body text-muted-foreground py-8">文章即將發布，敬請期待</p>
            ) : (
              featuredPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Automation Cases */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <p className="font-display text-sm text-primary tracking-widest uppercase mb-3">
              案例
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  精選案例
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-lg">
                  我自己做過的和值得參考的 AI 工作流程案例
                </p>
              </div>
              <Link
                href="/cases"
                className="font-display text-sm text-primary hover:opacity-80 transition-opacity flex items-center gap-1 shrink-0"
              >
                查看全部 <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredCases.length === 0 ? (
              <p className="font-body text-muted-foreground">案例即將上線，敬請期待</p>
            ) : (
              featuredCases.map((c) => (
                <CaseCard key={c.id} automationCase={c} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
