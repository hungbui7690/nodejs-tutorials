/*
  # Constraints


*****************************

  # Unique
  - The UNIQUE constraint ensures that all values in a column are different.
  - Both the UNIQUE and PRIMARY KEY constraints provide a guarantee for uniqueness for a column or set of columns.
  - A PRIMARY KEY constraint automatically has a UNIQUE constraint.
  -> You can have many UNIQUE constraints per table, but only one PRIMARY KEY constraint per table.


*****************************

  # Check
  - The CHECK constraint is used to limit the value range that can be placed in a column.
  - If you define a CHECK constraint on a column it will allow only certain values for this column.
  - If you define a CHECK constraint on a table it can limit the values in certain columns based on values in other columns in the row.
  - 🎯 NOT YET IMPLEMENTED IN DRIZZLE ORM


*/

import { int, text, unique, sqliteTable } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: int('id').unique(),
})
export const table = sqliteTable('table', {
  id: int('id').unique('custom_name'),
})
export const composite = sqliteTable(
  'composite_example',
  {
    id: int('id'),
    name: text('name'),
  },
  (t) => ({
    unq: unique().on(t.id, t.name),
    unq2: unique('custom_name').on(t.id, t.name),
  })
)
/*
  CREATE TABLE `user` (
      `id` integer
  );
  CREATE TABLE `table` (
    `id` integer
  );
  CREATE TABLE `composite_example` (
    `id` integer,
    `name` text
  );
  
  CREATE UNIQUE INDEX `composite_example_id_name_unique` ON `composite_example` (`id`,`name`);
  CREATE UNIQUE INDEX `custom_name` ON `composite_example` (`id`,`name`);
  CREATE UNIQUE INDEX `custom_name` ON `table` (`id`);
  CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);
*/
