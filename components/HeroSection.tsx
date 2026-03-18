import Link from 'next/link'
import { ArrowDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center pt-20">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <p className="font-display text-base text-primary tracking-widest uppercase mb-6 animate-fade-in-up">
            AI 流程自動化服務
          </p>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            重複的事交給 AI
            <br />
            <span className="text-primary">AI 的事交給值說</span>
          </h1>

          <p
            className="font-body text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-xl animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            自動化工具開發、AI 工作流程設計、企業導入諮詢
          </p>

          <Link
            href="/cases"
            className="animate-fade-in-up inline-flex items-center gap-2 font-display text-base text-muted-foreground hover:text-foreground transition-colors group"
            style={{ animationDelay: '0.3s' }}
          >
            探索企業案例
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
