import 'server-only'

import { db } from '@/db'

export const getNotes = async (limit: number = 50) => {
  return db.query.notes.findMany({ limit })
}
