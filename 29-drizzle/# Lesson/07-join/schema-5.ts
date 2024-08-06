import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
})

export const chatGroups = sqliteTable('chat_groups', {
  id: integer('id').primaryKey(),
  name: text('name'),
})

export const usersToChatGroups = sqliteTable('usersToChatGroups', {
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  groupId: integer('group_id')
    .notNull()
    .references(() => chatGroups.id),
})
