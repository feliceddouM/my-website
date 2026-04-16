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

        {/* Contact */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="font-display text-base text-primary tracking-widest uppercase mb-4">
            聯絡我們
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            想聊聊你的需求？
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a
              href="https://line.me/R/ti/p/@090nxouo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-base bg-[#06C755] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              加入 LINE 諮詢
            </a>
            <a
              href="mailto:hi.worthyai@gmail.com"
              className="font-body text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              或直接寫信給我們
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
