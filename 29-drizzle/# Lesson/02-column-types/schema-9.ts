/*
  Columns constraints
  - npm i @paralleldrive/cuid2
    -> generate random id


*****************************

  # Default value
  - The DEFAULT clause specifies a default value to use for the column if no value is explicitly provided by the user when doing an INSERT. If there is no explicit DEFAULT clause attached to a column definition, then the default value of the column is NULL.
  - An explicit DEFAULT clause may specify that the default value is NULL, a string constant, a blob constant, a signed-number, or any constant expression enclosed in parentheses.


*/

import { sql } from 'drizzle-orm'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

// CREATE TABLE `table` (
//   `int1` integer DEFAULT 42
//   `int2` integer DEFAULT (abs(42))
// );
const table = sqliteTable('table', {
  int1: integer('int1').default(42),
  int2: integer('int2').default(sql`(abs(42))`),
})

// A default value may also be one of the special case-independent keywords CURRENT_TIME, CURRENT_DATE or CURRENT_TIMESTAMP.
// CREATE TABLE `table` (
//   `time` text DEFAULT (CURRENT_TIME)
//   `date` text DEFAULT (CURRENT_DATE)
//   `timestamp` text DEFAULT (CURRENT_TIMESTAMP)
// );
const table1 = sqliteTable('table', {
  time: text('time').default(sql`(CURRENT_TIME)`),
  date: text('date').default(sql`(CURRENT_DATE)`),
  timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
})

// When using $default() or $defaultFn(), which are simply different aliases for the same function, you can generate defaults at runtime and use these values in all insert queries. These functions can assist you in utilizing various implementations such as uuid, cuid, cuid2, and many more.
// Note: This value does not affect the drizzle-kit behavior, it is only used at runtime in drizzle-orm

const table2 = sqliteTable('table', {
  id: text('id').$defaultFn(() => createId()),
})

// When using $onUpdate() or $onUpdateFn(), which are simply different aliases for the same function, you can generate defaults at runtime and use these values in all update queries.
// Adds a dynamic update value to the column. The function will be called when the row is updated, and the returned value will be used as the column value if none is provided. If no default (or $defaultFn) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
// Note: This value does not affect the drizzle-kit behavior, it is only used at runtime in drizzle-orm
const table3 = sqliteTable('table', {
  alwaysNull: text('always_null')
    .$type<string | null>()
    .$onUpdate(() => null),
})
