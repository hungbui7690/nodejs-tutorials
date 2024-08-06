/*
  Columns constraints


*****************************

  # Not null
    + NOT NULL constraint dictates that the associated column may not contain a NULL value.


*/

import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

// CREATE TABLE table (
//   `numInt` integer NOT NULL
// );
const table = sqliteTable('table', {
  numInt: integer('numInt').notNull(),
})
