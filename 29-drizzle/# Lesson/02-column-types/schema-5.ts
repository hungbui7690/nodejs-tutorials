/*
  Boolean
  - SQLite does not have native boolean data type, yet you can specify integer column to be in a boolean mode. This allows you to operate boolean values in your code and Drizzle stores them as 0 and 1 integer values in the database.


*/

import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

// CREATE TABLE `table` (
//   `id` integer
// );
const table = sqliteTable('table', {
  id: integer('id', { mode: 'boolean' }),
})
