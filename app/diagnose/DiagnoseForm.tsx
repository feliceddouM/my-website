'use client'

import { useState } from 'react'

type Answers = {
  role: string
  teamSize: string
  timeSpent: string
  toolCount: string
  wishFor: string
  email: string
  name: string
}

const questions = [
  {
    key: 'role' as const,
    num: 1,
    label: '你的職稱或角色是？',
    options: ['經營者／老闆', '主管／管理職', '執行人員', '其他'],
  },
  {
    key: 'teamSize' as const,
    num: 2,
    label: '你們團隊大概多少人？',
    options: ['1-5人', '6-20人', '21-100人', '100人以上'],
  },
  {
    key: 'timeSpent' as const,
    num: 3,
    label: '你們每週花最多時間在哪件事上？',
    options: ['整理數據或報表', '製作或發布內容', '追蹤進度或回報', '跨工具搬運資料', '其他'],
  },
  {
    key: 'toolCount' as const,
    num: 4,
    label: '你們現在用幾個工具在管理工作？',
    options: ['1-2個', '3-5個', '5個以上'],
  },
]

export default function DiagnoseForm() {
  const [answers, setAnswers] = useState<Answers>({
    role: '',
    teamSize: '',
    timeSpent: '',
    toolCount: '',
    wishFor: '',
    email: '',
    name: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function select(key: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-16">
        <p className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
          收到了！
        </p>
        <p className="font-body text-lg text-muted-foreground">
          我們會在兩個工作天內跟你聯繫。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">

      {/* Q1–Q4：單選題 */}
      {questions.map((q) => (
        <div key={q.key}>
          <p className="font-display text-xs text-primary tracking-widest uppercase mb-2">
            問題 {q.num}
          </p>
          <h3 className="font-display text-xl font-semibold text-foreground mb-5">
            {q.label}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {q.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => select(q.key, opt)}
                className={`px-4 py-2.5 rounded-md border font-display text-base transition-colors ${
                  answers[q.key] === opt
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-foreground hover:border-primary/40 hover:bg-secondary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Q5：文字輸入 */}
      <div>
        <p className="font-display text-xs text-primary tracking-widest uppercase mb-2">
          問題 5
        </p>
        <h3 className="font-display text-xl font-semibold text-foreground mb-5">
          如果這個流程能自動化，你最想省下時間做什麼？
        </h3>
        <textarea
          value={answers.wishFor}
          onChange={(e) => select('wishFor', e.target.value)}
          placeholder="隨便寫，幾個字就好"
          rows={3}
          className="w-full px-4 py-2.5 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground font-body text-base focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      {/* 個人資訊 */}
      <div className="border-t border-border pt-10 space-y-6">
        <div>
          <label className="font-display text-sm font-medium text-foreground block mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            required
            value={answers.email}
            onChange={(e) => select('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full sm:max-w-sm px-4 py-2.5 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground font-body text-base focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="font-display text-sm font-medium text-foreground block mb-2">
            姓名或暱稱{' '}
            <span className="text-muted-foreground font-normal">（選填）</span>
          </label>
          <input
            type="text"
            value={answers.name}
            onChange={(e) => select('name', e.target.value)}
            placeholder="怎麼稱呼你？"
            className="w-full sm:max-w-sm px-4 py-2.5 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground font-body text-base focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-destructive">出了點問題，請稍後再試</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center font-display text-base bg-primary text-primary-foreground px-8 py-3.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? '送出中…' : '送出問卷'}
      </button>
    </form>
  )
}
