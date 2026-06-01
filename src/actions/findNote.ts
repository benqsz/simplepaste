import 'server-only'

import { db } from '@/db'

export const findNote = async (id: string) => {
  return db.query.notes.findFirst({
    where: (notes, { eq, or }) => or(eq(notes.id, id), eq(notes.customUrl, id)),
  })
}
