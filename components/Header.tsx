'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun, ArrowUpRight, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/blog', label: '文章' },
  { href: '/cases', label: '案例' },
  { href: '/about', label: '關於我' },
]

function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="切換深色模式"
      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="font-display text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          值說
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-display text-sm transition-colors ${
                pathname === href || pathname.startsWith(href + '/')
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </Link>
          ))}

          <DarkModeToggle />

          <a
            href="mailto:hi.worthyai@gmail.com"
            className="font-display text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity inline-flex items-center gap-1"
          >
            聯繫我 <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile: dark mode toggle + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={menuOpen}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`font-display text-lg py-4 border-b border-border/50 transition-colors ${
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="mailto:hi.worthyai@gmail.com"
              className="font-display text-sm bg-primary text-primary-foreground px-4 py-3 rounded-md hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-1.5 mt-6 mb-2"
            >
              聯繫我 <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
