/*
  # Constraints


*****************************

  # Foreign key
  - The FOREIGN KEY constraint is used to prevent actions that would destroy links between tables. A FOREIGN KEY is a field (or collection of fields) in one table, that refers to the PRIMARY KEY in another table. The table with the foreign key is called the child table, and the table with the primary key is called the referenced or parent table.
  - Drizzle ORM provides several ways to declare foreign keys. You can declare them in a column declaration statement


*/

import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
})
export const book = sqliteTable('book', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  authorId: integer('author_id').references(() => user.id), // foreign key
})
