'use server'

import { db } from '@/db'
import { notes } from '@/db/schema'

export const createNote = async (content: string) => {
  const [note] = await db
    .insert(notes)
    .values({ content })
    .returning({ id: notes.id })

  return note.id
}
