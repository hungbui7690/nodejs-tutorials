import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  parentId: integer('parent_id')
    .notNull()
    .references(() => user.id),
})
