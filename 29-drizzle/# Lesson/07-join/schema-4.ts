import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core'

export const cities = sqliteTable('cities', {
  id: integer('id').primaryKey(),
  name: text('name'),
})

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
  cityId: integer('city_id').references(() => cities.id),
})
