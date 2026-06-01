import Link from 'next/link'

import { Container } from '@/components/ui/container'
import { ThemeButton } from '@/components/ui/theme-button'
import { Typography } from '@/components/ui/typography'

export function Header() {
  return (
    <header className="border-b bg-background sticky top-0 w-full h-12">
      <Container className="flex justify-between items-center gap-4">
        <Link href="/">
          <Typography variant="muted">simplepaste</Typography>
        </Link>
        <ThemeButton />
      </Container>
    </header>
  )
}
