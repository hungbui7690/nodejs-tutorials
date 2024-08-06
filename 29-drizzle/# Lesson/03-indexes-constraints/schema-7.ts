/*
  # Constraints


*****************************

  # Foreign key
  - If you want to do a self reference, due to a TypeScript limitations you will have to either explicitly set return type for reference callback or user a standalone foreignKey operator.


*/

import {
  integer,
  text,
  foreignKey,
  sqliteTable,
  AnySQLiteColumn,
} from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  parentId: integer('parent_id').references((): AnySQLiteColumn => user.id),
})

//or
export const userX = sqliteTable(
  'user',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    parentId: integer('parent_id'),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: 'custom_fk',
      }),
    }
  }
)
