'use server'

import { db } from '@/db'
import { notes } from '@/db/schema'

type Props = {
  content: string
  customUrl?: string
}

export const createNote = async ({ content, customUrl }: Props) => {
  const [note] = await db
    .insert(notes)
    .values({ content, customUrl })
    .returning({ id: notes.id, customUrl: notes.customUrl })

  return note
}
