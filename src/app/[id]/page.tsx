import { notFound } from 'next/navigation'

import { Container } from '@/components/ui/container'
import { Md } from '@/components/ui/md'
import { db } from '@/db'

export default async function NotePage({ params }: PageProps<'/[id]'>) {
  const { id } = await params
  const note = await db.query.notes.findFirst({
    where: (notes, { eq }) => eq(notes.id, id),
  })

  if (!note) notFound()

  return (
    <Container className="flex flex-col gap-4">
      <Md content={note.content} />
    </Container>
  )
}
