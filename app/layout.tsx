import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Felice Wu｜AI 工作教練 & 內容創作者',
    template: '%s｜Felice Wu',
  },
  description: 'AI 工作教練 Felice 分享 AI 工作術、工作流程設計與知識管理技巧，幫助個人在資訊爆炸的時代打造真正用得起來的工作系統',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://felicewu.dev'),
  openGraph: {
    siteName: 'Felice Wu',
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        {/* Analytics placeholder — add Google Analytics <Script> tag here when ready */}
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
