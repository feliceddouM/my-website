'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

const benefits = [
  '做專案時踩過的坑、還沒公開的工具心得',
  '我這兩週在幫什麼客戶解決什麼問題',
  '官網沒寫的第一手觀察',
]

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-xl">

          <p className="font-display text-base text-primary tracking-widest uppercase mb-3">
            電子報
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            偶爾寄給你一封有料的信
          </h2>

          <p className="font-body text-lg text-muted-foreground mb-7 leading-relaxed">
            分享實戰心得，讓你少走彎路。
          </p>

          <ul className="space-y-3 mb-8">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-base text-muted-foreground leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          {status === 'success' ? (
            <p className="font-body text-base text-foreground py-2">
              已收到！下一封信見 👋
            </p>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-3">
                <input
                  type="email"
                  required
                  placeholder="你的 email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="flex-1 px-4 py-2.5 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground font-body text-base focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-display text-base font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
                >
                  {status === 'loading' ? '訂閱中…' : '訂閱'}
                </button>
              </form>

              {status === 'error' && (
                <p className="font-body text-sm text-destructive mb-2">出了點問題，請稍後再試</p>
              )}

              <p className="font-body text-xs text-muted-foreground/60">
                不定時寄出，隨時可取消訂閱
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
