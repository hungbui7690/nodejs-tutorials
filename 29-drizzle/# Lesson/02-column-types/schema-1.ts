/*
  Integer
  - A signed integer, stored in 0, 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.


*/

import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

/*
  CREATE TABLE IF NOT EXISTS "table" (
    "int" integer
  );
*/
const table = sqliteTable('table', {
  id: integer('id'),
})

// you can customize integer mode to be number, boolean, timestamp, timestamp_ms
integer('id', { mode: 'number' })
integer('id', { mode: 'boolean' })
integer('id', { mode: 'timestamp_ms' })
integer('id', { mode: 'timestamp' }) // Date

/*
  CREATE TABLE `table` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
  );
*/
const table1 = sqliteTable('table', {
  // to make integer primary key auto increment
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
})
