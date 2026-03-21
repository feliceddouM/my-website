import type { Metadata } from 'next'
import NotionRenderer from '@/components/NotionRenderer'
import { getAboutContent } from '@/lib/notion'

export const revalidate = 86400 // ISR: 24 hours

export const metadata: Metadata = {
  title: { absolute: '關於值說 WorthIt' },
  description: '值說 WorthIt 從使用者而非工程師的角度切入 AI 自動化，幫助品牌與團隊把複雜的 AI 應用轉化成聽得懂的語言，用小步快跑的方式迅速落地執行。',
}

export default async function AboutPage() {
  const content = await getAboutContent().catch(() => '')

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-display text-base text-primary tracking-widest uppercase mb-3">
            關於值說
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            我們的故事
          </h1>
        </div>

        {/* Notion content */}
        <NotionRenderer content={content} />
      </div>
    </div>
  )
}
