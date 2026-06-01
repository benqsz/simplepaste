import './globals.css'

import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Header } from '@/components/header'
import { Providers } from '@/components/providers'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'simplepaste',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn('font-mono', jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
