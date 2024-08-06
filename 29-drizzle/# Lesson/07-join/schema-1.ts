import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
})

export const pets = sqliteTable('pets', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => users.id),
})
