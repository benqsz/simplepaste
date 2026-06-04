import Link from 'next/link'

import { Typography } from '@/components/ui/typography'

export function Footer() {
  return (
    <footer className="flex justify-center mt-4 mb-2">
      <Link href="/">
        <Typography variant="muted">simplepaste</Typography>
      </Link>
    </footer>
  )
}
