import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// You can declare tables, indexes and constraints, foreign keys and enums...
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  fullName: text('full_name'),
  phone: text('phone'),
})

export type User = typeof users.$inferSelect // return type when queried
export type InsertUser = typeof users.$inferInsert // insert type
