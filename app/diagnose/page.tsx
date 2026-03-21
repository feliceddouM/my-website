import type { Metadata } from 'next'
import DiagnoseForm from './DiagnoseForm'

export const metadata: Metadata = {
  title: '流程健診問卷',
  description: '花兩分鐘，看看你的流程有多少可以省。填完之後，我們會根據你的狀況給出具體建議。',
}

export default function DiagnosePage() {
  return (
    <section className="min-h-screen pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">

        <p className="font-display text-base text-primary tracking-widest uppercase mb-4">
          流程健診
        </p>

        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
          花兩分鐘，
          <br />
          看看你的流程有多少可以省
        </h1>

        <p className="font-body text-lg text-muted-foreground mb-16 leading-relaxed">
          填完之後，我們會根據你的狀況給出具體建議。
        </p>

        <DiagnoseForm />
      </div>
    </section>
  )
}
