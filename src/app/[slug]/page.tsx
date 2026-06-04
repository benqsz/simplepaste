import { notFound } from 'next/navigation'

import { Container } from '@/components/ui/container'
import { Md } from '@/components/ui/md'
import { Typography } from '@/components/ui/typography'
import { findNote } from '@/actions/findNote'
import { getNotes } from '@/actions/getNotes'
import { incrementViews } from '@/actions/incrementViews'

export async function generateStaticParams() {
  const notes = await getNotes()

  return notes.map(note => ({
    slug: note.slug,
  }))
}

export default async function NotePage({ params }: PageProps<'/[slug]'>) {
  const { slug } = await params
  const note = await findNote(slug)

  if (!note) {
    notFound()
  }
  if (note.showViews) {
    await incrementViews(note.id)
  }

  return (
    <Container className="flex flex-col gap-4 h-screen-header">
      <Md content={note.content} className="grow" />
      <div className="flex justify-between flex-wrap gap-4">
        {note.showViews && (
          <Typography variant="small">Views: {note.views}</Typography>
        )}
        {note.showCreatedAt && (
          <Typography variant="small">
            Created at: {note.createdAt.toLocaleDateString()}
          </Typography>
        )}
      </div>
    </Container>
  )
}
