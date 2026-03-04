import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import NotionRenderer from '@/components/NotionRenderer'
import { getCaseBySlug, getAllCaseSlugs, getPostContent } from '@/lib/notion'

export const revalidate = 3600 // ISR: 1 hour

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllCaseSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = await getCaseBySlug(slug)
  if (!c) return {}
  return {
    title: c.name,
    description: c.description,
  }
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params
  const [c, content] = await Promise.all([
    getCaseBySlug(slug),
    getCaseBySlug(slug).then((c) => (c ? getPostContent(c.id) : '')),
  ])

  if (!c) notFound()

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 font-display text-lg text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回案例列表
        </Link>

        {/* Icon + Meta */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl shrink-0">
            {c.icon || '⚙️'}
          </div>
          <div className="flex gap-2 flex-wrap">
            {c.tools.map((tool) => (
              <span
                key={tool}
                className="font-display text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.15] mb-12">
          {c.name}
        </h1>

        {/* Content */}
        {content ? (
          <NotionRenderer content={content} />
        ) : (
          <p className="font-body text-muted-foreground">內容即將上線，敬請期待</p>
        )}

        {/* Metric — shown after content as conclusion */}
        {c.metric && (
          <div className="mt-12">
            <p className="font-display text-xl font-semibold text-foreground mb-3">成果</p>
            <p className="font-body text-lg text-foreground leading-[1.75] border-l-4 border-primary pl-5">
              {c.metric}
            </p>
          </div>
        )}

        {/* External link */}
        {c.link && c.link !== '#' && (
          <div className="mt-8 pt-8 border-t border-border">
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-sm text-primary hover:opacity-80 transition-opacity"
            >
              查看相關連結 →
            </a>
          </div>
        )}

        {/* Bottom action bar: CTA + back link */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between gap-4 flex-wrap">
          <a
            href="https://line.me/ti/p/~fcfwu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display text-lg font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            有類似需求？透過 LINE 聯繫我
          </a>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 font-display text-lg text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            返回案例列表
          </Link>
        </div>
      </div>
    </div>
  )
}
