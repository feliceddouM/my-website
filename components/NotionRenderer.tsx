import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-display text-3xl font-bold text-foreground mt-10 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="font-body text-foreground leading-relaxed mb-5">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="font-body list-disc list-inside space-y-2 mb-5 text-foreground">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="font-body list-decimal list-inside space-y-2 mb-5 text-foreground">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-5 italic text-muted-foreground my-6">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <pre className="bg-secondary rounded-lg p-4 overflow-x-auto mb-5">
          <code className="font-display text-sm text-foreground">{children}</code>
        </pre>
      )
    }
    return (
      <code className="font-display text-sm bg-secondary text-primary px-1.5 py-0.5 rounded">
        {children}
      </code>
    )
  },
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="border-border my-8" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
}

interface NotionRendererProps {
  content: string
}

export default function NotionRenderer({ content }: NotionRendererProps) {
  return (
    <div className="max-w-2xl">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}
