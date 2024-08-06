/*
  # Constraints


*****************************

  # Not null
  - By default, a column can hold NULL values. The NOT NULL constraint enforces a column to NOT accept NULL values.
  - This enforces a field to always contain a value, which means that you cannot insert a new record, or update a record without adding a value to this field.


*/

import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

// CREATE TABLE table (
//   `numInt` integer NOT NULL
// );
const table = sqliteTable('table', {
  numInt: integer('numInt').notNull(),
})
