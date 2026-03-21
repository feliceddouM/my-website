import type { Metadata } from 'next'
import DiagnoseForm from './DiagnoseForm'

export const metadata: Metadata = {
  title: '免費流程健診',
  description: '花兩分鐘了解你的工作流程有多少可以自動化、省下來的時間可以拿去做什麼。',
}

export default function DiagnosePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">

        <div className="mb-16">
          <p className="font-display text-base text-primary tracking-widest uppercase mb-3">
            流程健檢
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            花兩分鐘，
            <br />
            看看你的流程有多少可以省
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-lg">
            填完之後，我們會根據你的狀況給出具體建議。
          </p>
        </div>

        <DiagnoseForm />
      </div>
    </div>
  )
}
