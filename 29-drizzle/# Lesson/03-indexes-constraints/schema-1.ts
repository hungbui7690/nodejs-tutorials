/*
  Indexes & Constraints

*****************************

  # Constraints
  - SQL constraints are the rules enforced on table columns. They are used to prevent invalid data from being entered into the database.
  - This ensures the accuracy and reliability of your data in the database.

*****************************
    > Default
    - The DEFAULT clause specifies a default value to use for the column if no value provided by the user when doing an INSERT. If there is no explicit DEFAULT clause attached to a column definition, then the default value of the column is NULL.
    - An explicit DEFAULT clause may specify that the default value is NULL, a string constant, a blob constant, a signed-number, or any constant expression enclosed in parentheses.


*/

import { sql } from 'drizzle-orm'
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

// CREATE TABLE `table` (
//   `int1` integer DEFAULT 42
//   `int2` integer DEFAULT (abs(42))
// );
const table = sqliteTable('table', {
  int1: integer('int1').default(42),
  int2: integer('int2').default(sql`(abs(42))`),
})
