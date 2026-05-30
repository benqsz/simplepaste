import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'

export default function Home() {
  return (
    <div>
      <Container className="flex flex-col gap-4">
        <Typography variant="lead">Create new note</Typography>
        <ButtonGroup className="ml-auto">
          <Button variant="ghost">Help</Button>
          <Button variant="secondary">Options</Button>
          <Button variant="secondary">Preview</Button>
          <Button>Create</Button>
        </ButtonGroup>
      </Container>
    </div>
  )
}
