import type { Metadata } from 'next'
import NotionRenderer from '@/components/NotionRenderer'
import { getAboutContent } from '@/lib/notion'

export const revalidate = 86400 // ISR: 24 hours

export const metadata: Metadata = {
  title: '關於我',
  description: '我是 Felice，AI 工作教練 & 內容創作者。用 AI 工作術幫助容易分心拖延的人找到屬於自己的工作節奏',
}

export default async function AboutPage() {
  const content = await getAboutContent().catch(() => '')

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-display text-sm text-primary tracking-widest uppercase mb-3">
            關於我
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            你好，我是 Felice
          </h1>
        </div>

        {/* Notion content */}
        <NotionRenderer content={content} />
      </div>
    </div>
  )
}
