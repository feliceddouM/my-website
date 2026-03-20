import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import ArticleCard from '@/components/ArticleCard'
import CaseCard from '@/components/CaseCard'
import NewsletterSection from '@/components/NewsletterSection'
import { getPublishedPosts, getCases } from '@/lib/notion'

export const revalidate = 3600 // ISR: revalidate every 1 hour

export const metadata: Metadata = {
  title: '值說 WorthIt',
  description: '值說 (WorthIt) 提供 AI 流程自動化服務，幫助企業和團隊把重複性工作交給 AI，把時間花在真正值得的事。服務涵蓋自動化工具開發、AI 工作流程設計與企業導入諮詢。',
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
            <p className="font-display text-base text-primary tracking-widest uppercase mb-3">
              文章
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  最新文章
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-lg">
                  AI 趨勢 × 自動化教學
                </p>
              </div>
              <Link
                href="/blog"
                className="font-display text-base text-primary hover:opacity-80 transition-opacity flex items-center gap-1 shrink-0"
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

      {/* Newsletter */}
      <NewsletterSection />

      {/* Automation Cases */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <p className="font-display text-base text-primary tracking-widest uppercase mb-3">
              案例
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  精選案例
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-lg">
                  企業自動化案例
                </p>
              </div>
              <Link
                href="/cases"
                className="font-display text-base text-primary hover:opacity-80 transition-opacity flex items-center gap-1 shrink-0"
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
