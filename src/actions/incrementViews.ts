import 'server-only'

import { eq, sql } from 'drizzle-orm'

import { db } from '@/db'
import { notes } from '@/db/schema'

export const incrementViews = async (id: number) => {
  await db
    .update(notes)
    .set({
      views: sql`${notes.views} + 1`,
    })
    .where(eq(notes.id, id))
}
