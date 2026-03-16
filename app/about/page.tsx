import type { Metadata } from 'next'
import NotionRenderer from '@/components/NotionRenderer'
import { getAboutContent } from '@/lib/notion'

export const revalidate = 86400 // ISR: 24 hours

export const metadata: Metadata = {
  title: '關於值說',
  description: '值說 (WorthIt) 提供 AI 流程自動化服務，幫助企業和團隊把重複性工作交給 AI，把時間花在真正值得的事。服務涵蓋自動化工具開發、AI 工作流程設計與企業導入諮詢。',
}

export default async function AboutPage() {
  const content = await getAboutContent().catch(() => '')

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-display text-sm text-primary tracking-widest uppercase mb-3">
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
