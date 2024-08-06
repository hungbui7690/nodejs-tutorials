import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
})

export const accounts = sqliteTable('accounts', {
  id: integer('id').primaryKey(),
  balance: numeric('balance'),
})
