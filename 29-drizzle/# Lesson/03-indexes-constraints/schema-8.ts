/*
  # Constraints


*****************************

  # Foreign key
  - To declare multi-column foreign keys you can use a dedicated foreignKey operator


*/

import {
  integer,
  text,
  primaryKey,
  foreignKey,
  sqliteTable,
  AnySQLiteColumn,
} from 'drizzle-orm/sqlite-core'

export const user = sqliteTable(
  'user',
  {
    firstName: text('firstName'),
    lastName: text('lastName'),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.firstName, table.lastName] }),
    }
  }
)
export const profile = sqliteTable(
  'profile',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userFirstName: text('user_first_name'),
    userLastName: text('user_last_name'),
  },
  (table) => {
    return {
      userReference: foreignKey(() => ({
        columns: [table.userFirstName, table.userLastName],
        foreignColumns: [user.firstName, user.lastName],
        name: 'custom_name',
      })),
    }
  }
)
