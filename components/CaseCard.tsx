import { ArrowUpRight } from 'lucide-react'
import type { AutomationCase } from '@/lib/notion'

interface CaseCardProps {
  automationCase: AutomationCase
}

export default function CaseCard({ automationCase: c }: CaseCardProps) {
  const CardWrapper = c.link && c.link !== '#'
    ? ({ children }: { children: React.ReactNode }) => (
        <a
          href={c.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-background border border-border rounded-lg p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
        >
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="group block bg-background border border-border rounded-lg p-8">
          {children}
        </div>
      )

  return (
    <CardWrapper>
      {/* Icon + Arrow */}
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
          {c.icon || '⚙️'}
        </div>
        {c.link && c.link !== '#' && (
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        )}
      </div>

      {/* Name */}
      <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
        {c.name}
      </h3>

      {/* Description */}
      <p className="font-body text-muted-foreground leading-relaxed mb-6 text-sm">
        {c.description}
      </p>

      {/* Tools + Metric */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {c.tools.map((tool) => (
            <span
              key={tool}
              className="font-display text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-sm"
            >
              {tool}
            </span>
          ))}
        </div>
        {c.metric && (
          <span className="font-display text-xs text-primary font-semibold shrink-0">
            {c.metric}
          </span>
        )}
      </div>
    </CardWrapper>
  )
}
