/*
  Sequence
  - Postgres ONLY


*****************************

  Views (WIP)
  - Views are currently only implemented in the drizzle-orm, drizzle-kit does not support views yet. You can query the views that already exist in the database, but they won’t be added to drizzle-kit migrations or db push as of now.


*****************************

  Views declaration
  - There’re several ways you can declare views with Drizzle ORM.
  - You can declare views that have to be created or you can declare views that already exist in the database.
  - You can declare views statements with an inline query builder syntax, with standalone query builder and with raw sql operators.
  - When views are created with either inlined or standalone query builders, view columns schema will be automatically inferred, yet when you use sql you have to explicitly declare view columns schema.


*/

import { integer, text, sqliteView, sqliteTable } from 'drizzle-orm/sqlite-core'
import { eq } from 'drizzle-orm'

export const user = sqliteTable('user', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  role: text('role').$type<'admin' | 'customer'>(),
  createdAt: integer('created_at'),
  updatedAt: integer('updated_at'),
})

// CREATE VIEW "user_view" AS SELECT * FROM "user";
export const userView = sqliteView('user_view').as((qb) =>
  qb.select().from(user)
)

// CREATE VIEW "customers_view" AS SELECT * FROM "user" WHERE "role" = 'customer';
export const customersView = sqliteView('customers_view').as((qb) =>
  qb.select().from(user).where(eq(user.role, 'customer'))
)

// If you need a subset of columns you can use .select({ ... }) method in query builder, like this:
// CREATE VIEW "customers_view" AS SELECT "id", "name", "email" FROM "user" WHERE "role" = 'customer';
export const customersViewX = sqliteView('customers_view').as((qb) => {
  return qb
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
    })
    .from(user)
})
