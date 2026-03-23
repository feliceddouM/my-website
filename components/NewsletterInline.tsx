'use client'

import { useState } from 'react'

export default function NewsletterInline() {
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
    <div className="mt-16 pt-12 border-t border-border">
      <p className="font-display text-base text-primary tracking-widest uppercase mb-6">
        值說電子報
      </p>

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
  )
}
