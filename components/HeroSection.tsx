import Link from 'next/link'
import { ArrowDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center pt-20">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <p className="font-display text-sm text-primary tracking-widest uppercase mb-6 animate-fade-in-up">
            自動化工具開發・AI 工作流程設計・企業導入諮詢
          </p>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            資訊爆炸的時代，
            <br />
            <span className="text-primary">用AI工作術讓生活更有餘裕</span>
          </h1>

          <p
            className="font-body text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-xl animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            課程、模板、1 對 1 諮詢，幫助個人打造真正用得起來的工作系統
          </p>

          <Link
            href="/blog"
            className="animate-fade-in-up inline-flex items-center gap-2 font-display text-sm text-muted-foreground hover:text-foreground transition-colors group"
            style={{ animationDelay: '0.3s' }}
          >
            探索我的文章
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
