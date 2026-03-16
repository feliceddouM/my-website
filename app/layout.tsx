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
  description: '值說 (WorthIt) 提供 AI 流程自動化服務，幫助企業和團隊把重複性工作交給 AI，把時間花在真正值得的事。服務涵蓋自動化工具開發、AI 工作流程設計與企業導入諮詢。',
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
