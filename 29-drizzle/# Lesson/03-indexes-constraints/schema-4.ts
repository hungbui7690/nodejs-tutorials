/*
  # Constraints


*****************************

  # Primary Key
  - The PRIMARY KEY constraint uniquely identifies each record in a table.
  - Primary keys must contain UNIQUE values, and cannot contain NULL values.
  - A table can have only ONE primary key; and in the table, this primary key can consist of single or multiple columns (fields).


*/

import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: integer('id').primaryKey(),
})
export const pet = sqliteTable('pet', {
  id: integer('id').primaryKey(),
})

/*
  CREATE TABLE `user` (
      `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
  );
  CREATE TABLE `pet` (
      `id` integer PRIMARY KEY AUTOINCREMENT
  )
*/
