import 'server-only'

import { db } from '@/db'

export const findNote = async (slug: string) => {
  return db.query.notes.findFirst({
    where: (notes, { eq }) => eq(notes.slug, slug),
  })
}
