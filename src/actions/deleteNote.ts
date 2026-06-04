import 'server-only'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { notes } from '@/db/schema'

export const deleteNote = async (id: number) => {
  return db.delete(notes).where(eq(notes.id, id))
}
