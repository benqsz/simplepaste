import { Container } from '@/components/ui/container'
import { ThemeButton } from '@/components/ui/theme-button'
import { Typography } from '@/components/ui/typography'

export function Footer() {
  return (
    <footer className="border-t w-full">
      <Container className="flex flex-col items-center gap-4">
        <ThemeButton />
        <Typography variant="muted" className="text-center">
          simplepaste
        </Typography>
      </Container>
    </footer>
  )
}
