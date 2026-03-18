import Link from 'next/link'

const socialLinks = [
  { href: 'https://www.linkedin.com/in/felice-fc-wu', label: 'LinkedIn' },
  { href: 'https://www.threads.com/@fcfwu', label: 'Threads' },
]

const navLinks = [
  { href: '/blog', label: '文章' },
  { href: '/cases', label: '案例' },
  { href: '/about', label: '關於我' },
]

export default function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-bold text-foreground mb-2">
              值說
            </p>
            <p className="font-body text-base text-muted-foreground">
              AI 流程自動化服務
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-display text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex gap-4">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="font-display text-sm text-muted-foreground mt-12">
          © 2026 值說 WorthIt｜版權所有
        </p>
      </div>
    </footer>
  )
}
