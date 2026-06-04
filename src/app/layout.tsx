import './globals.css'

import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'

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
        <main>{children}</main>
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  )
}
