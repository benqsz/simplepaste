import { notFound } from 'next/navigation'

import { NoteButtons } from '@/components/noteButtons'
import { Container } from '@/components/ui/container'
import { Md } from '@/components/ui/md'
import { Typography } from '@/components/ui/typography'
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
        <NoteButtons content={note.content} />
        <div className="flex gap-2 flex-wrap items-center">
          {note.showViews && (
            <Typography variant="small">Views: {note.views + 1}</Typography>
          )}
          {note.showCreatedAt && (
            <Typography variant="small">
              Created at: {note.createdAt.toLocaleDateString()}
            </Typography>
          )}
        </div>
      </div>
    </Container>
  )
}
