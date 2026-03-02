import type { Metadata } from 'next'
import CaseCard from '@/components/CaseCard'
import { getCases } from '@/lib/notion'

export const revalidate = 86400 // ISR: 24 hours

export const metadata: Metadata = {
  title: '自動化案例',
  description: '實際執行過的流程自動化專案與小工具，每個案例都有工具介紹與成果數據',
}

export default async function CasesPage() {
  const cases = await getCases().catch(() => [])

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-display text-sm text-primary tracking-widest uppercase mb-3">
            自動化案例
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            所有案例
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-lg">
            真實的 AI 應用或自動化案例
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {cases.length === 0 ? (
            <p className="font-body text-muted-foreground">案例即將上線，敬請期待</p>
          ) : (
            cases.map((c) => (
              <CaseCard key={c.id} automationCase={c} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
