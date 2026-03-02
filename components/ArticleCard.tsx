import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'
import type { BlogPost } from '@/lib/notion'

interface ArticleCardProps {
  post: BlogPost
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-8 first:pt-0 last:pb-0"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          {/* Category + Date */}
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span className="font-display text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-sm uppercase tracking-wider">
                {post.category}
              </span>
            )}
            {post.publishedDate && (
              <span className="font-display text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.publishedDate).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="font-body text-muted-foreground leading-relaxed max-w-xl">
              {post.excerpt}
            </p>
          )}
        </div>

        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all mt-1 shrink-0" />
      </div>
    </Link>
  )
}
