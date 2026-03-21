import type { Metadata } from 'next'
import CaseCard from '@/components/CaseCard'
import { getCases } from '@/lib/notion'

export const revalidate = 86400 // ISR: 24 hours

export const metadata: Metadata = {
  title: '案例',
  description: '實際執行與精選分析的 AI 流程自動化案例，包含工具選擇、解題過程與 before/after 成果對比，提供可直接參考的自動化靈感。',
}

export default async function CasesPage() {
  const cases = await getCases().catch(() => [])

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-display text-base text-primary tracking-widest uppercase mb-3">
            自動化案例
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            所有案例
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-lg">
            企業自動化案例
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
