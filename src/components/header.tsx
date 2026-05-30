import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'

export function Header() {
  return (
    <header className="border-b w-full sticky top-0">
      <Container>
        <Typography as="h1">simplepaste</Typography>
      </Container>
    </header>
  )
}
