/*
  # Indexes
  - Drizzle ORM provides API for both index and unique index declaration:


*/

import {
  integer,
  text,
  index,
  uniqueIndex,
  sqliteTable,
} from 'drizzle-orm/sqlite-core'

export const user = sqliteTable(
  'user',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    email: text('email'),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name),
      emailIdx: uniqueIndex('email_idx').on(table.email),
    }
  }
)
/*
  CREATE TABLE `user` (
    ...
  );
  CREATE INDEX `name_idx` ON `user` (`name`);
  CREATE UNIQUE INDEX `email_idx` ON `user` (`email`);
*/

// Drizzle ORM provides set of all params for index creation:

// Index declaration reference
// index('name')
//   .on(table.name)
//   .where(sql`...`)
