import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { MAX_URL_LENGTH } from '@/lib/constants'

export const notes = sqliteTable('notes', {
  id: integer().primaryKey({ autoIncrement: true }),
  slug: text({ length: MAX_URL_LENGTH }).unique().notNull(),
  content: text().notNull(),
  showViews: integer({ mode: 'boolean' }).default(true).notNull(),
  views: integer().default(0).notNull(),
  showCreatedAt: integer({ mode: 'boolean' }).default(true).notNull(),
  deleteAfterViews: integer(),
  createdAt: integer({ mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
})
