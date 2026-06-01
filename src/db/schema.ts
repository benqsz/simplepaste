import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { MAX_URL_LENGTH } from '@/lib/constants'

export const notes = sqliteTable('notes', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  customUrl: text({ length: MAX_URL_LENGTH }).unique(),
  content: text().notNull(),
})
