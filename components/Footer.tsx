import Link from 'next/link'

const socialLinks = [
  { href: 'https://www.threads.com/@worthyai.tw', label: 'Threads' },
]

const navLinks = [
  { href: '/blog', label: '觀點' },
  { href: '/cases', label: '案例' },
  { href: '/diagnose', label: '流程健檢' },
  { href: '/about', label: '關於值說' },
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
                  aria-label={label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {/* Threads logo */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 192 192"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M141.537 88.988c-1.143-.528-2.302-1.016-3.472-1.464-2.037-27.514-16.513-43.25-41.81-43.41h-.344c-15.2 0-27.356 6.413-34.88 18.018l12.791 8.41c5.668-8.676 14.574-10.787 22.073-10.787h.23c11.9.077 20.875 3.525 26.669 10.228 4.189 4.823 6.794 11.41 7.804 19.624-7.527-1.244-15.664-1.58-24.092-.996-23.27 1.525-37.553 14.781-36.72 33.17.42 9.299 4.862 17.148 12.8 22.095 6.783 4.22 15.687 6.218 24.996 5.71 12.25-.672 21.727-5.372 28.133-13.983 4.83-6.554 7.845-15.042 9.138-25.67 5.16 3.115 8.994 7.362 10.996 12.507 3.666 9.472 3.842 24.02-8.72 36.557-11.387 11.468-24.75 16.425-45.395 16.378-22.977-.156-40.591-7.368-52.36-21.435-11.079-13.227-16.81-32.387-17-57.045.19-24.658 5.921-43.817 17-57.044 11.769-14.066 29.383-21.278 52.36-21.434 23.14.157 40.986 7.417 53.01 21.632 5.916 7 10.284 15.838 13.038 26.245l15.789-4.093c-3.415-13.194-8.803-24.46-16.143-33.372C154.418 12.302 132.613 3.217 103.87 3l-.07.001C75.277 3.217 53.723 12.34 38.746 30.129 25.231 46.298 18.208 68.957 18 97.999c.208 29.042 7.231 51.701 20.746 67.87 14.977 17.79 36.531 26.912 65.124 27.128h.07c28.593-.216 50.147-9.338 65.124-27.128 13.515-16.169 20.538-38.828 20.746-67.87-.208-29.042-7.231-51.701-20.746-67.87zM109.287 134.63c-8.735.478-17.752-2.974-18.11-11.635-.254-5.865 3.896-12.375 16.741-13.22 1.517-.099 2.997-.143 4.442-.143 6.517 0 12.6.701 18.106 2.056-1.683 17.338-11.813 22.42-21.18 22.942z" />
                  </svg>
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
