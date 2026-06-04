import { notFound } from 'next/navigation'

import { NoteActions } from '@/components/noteActions'
import { NoteStats } from '@/components/noteStats'
import { Container } from '@/components/ui/container'
import { Md } from '@/components/ui/md'
import { deleteNote } from '@/actions/deleteNote'
import { findNote } from '@/actions/findNote'
import { incrementViews } from '@/actions/incrementViews'

export const dynamic = 'force-dynamic'

export default async function NotePage({ params }: PageProps<'/[slug]'>) {
  const { slug } = await params
  const note = await findNote(slug)

  if (!note) {
    notFound()
  }

  await incrementViews(note.id)

  if (note.deleteAfterViews) {
    if (note.deleteAfterViews <= note.views) {
      await deleteNote(note.id)
      notFound()
    }
  }

  return (
    <Container className="flex flex-col gap-4">
      <Md content={note.content} />
      <div className="flex gap-2 items-center justify-between">
        <NoteActions content={note.content} />
        <NoteStats
          showViews={note.showViews}
          views={note.views}
          showCreatedAt={note.showCreatedAt}
          createdAt={note.createdAt}
        />
      </div>
    </Container>
  )
}
