import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'

export default function NotFoundPage() {
  return (
    <Container className="flex-col flex justify-center items-center gap-4 h-screen-header">
      <Typography as="h1">Page not found</Typography>
    </Container>
  )
}
