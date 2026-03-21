import Link from 'next/link'
import { ArrowUpRight, ArrowDown } from 'lucide-react'

// TODO: 替換成正確的 LINE 預約連結，或設定環境變數 LINE_URL
const LINE_URL = process.env.LINE_URL ?? 'mailto:hi.worthyai@gmail.com'

export default function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center pt-20">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <p className="font-display text-base text-primary tracking-widest uppercase mb-6 animate-fade-in-up">
            AI 工作流程・自動化工具・企業導入
          </p>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            重複的工作交給 AI
            <br />
            <span className="text-primary">串自動化流程交給我們</span>
          </h1>

          <p
            className="font-body text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-xl animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            讓報表自己跑、內容自己發、數據自己更新
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-display text-base bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              免費 15 分鐘流程健檢 <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="#cases"
              className="inline-flex items-center justify-center gap-2 font-display text-base border border-border text-muted-foreground px-6 py-3 rounded-md hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              看案例 <ArrowDown className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
