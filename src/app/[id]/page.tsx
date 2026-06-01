import { notFound } from 'next/navigation'

import { Container } from '@/components/ui/container'
import { Md } from '@/components/ui/md'
import { findNote } from '@/actions/findNote'
import { getNotes } from '@/actions/getNotes'

export async function generateStaticParams() {
  const notes = await getNotes()

  return notes.map(note => ({
    id: note.customUrl || note.id,
  }))
}

export default async function NotePage({ params }: PageProps<'/[id]'>) {
  const { id } = await params
  const note = await findNote(id)
  if (!note) notFound()

  return (
    <Container className="flex flex-col gap-4 h-screen-header">
      <Md content={note.content} className="grow" />
    </Container>
  )
}
