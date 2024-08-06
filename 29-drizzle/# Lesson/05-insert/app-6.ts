/*
  SQL Insert
  - Drizzle ORM provides you the most SQL-like way to insert rows into the database tables.

    # On conflict do update -> will update the row if there’s a conflict
      => where clauses: on conflict do update can have a where clause in two different places - as part of the conflict target (i.e. for partial indexes) or as part of the update clause


******************************

  sql“ template
  - One of the most common usages you may encounter in other ORMs as well is the ability to use sql queries as-is for raw queries.


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sql } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

/*
  insert into employees (employee_id, name)
  values (123, 'John Doe')
  on conflict (employee_id) where name <> 'John Doe'
  do update set name = excluded.name

  insert into employees (employee_id, name)
  values (123, 'John Doe')
  on conflict (employee_id) do update set name = excluded.name
  where name <> 'John Doe';
*/

// 1. To specify these conditions in Drizzle, you can use setWhere and targetWhere clauses:
await db
  .insert(schema.users)
  .values({ id: 123, name: 'John Doe' })
  .onConflictDoUpdate({
    target: schema.users.id,
    targetWhere: sql`name <> 'John Doe'`,
    set: { name: sql`excluded.name` },
  })

await db
  .insert(schema.users)
  .values({ id: 124, name: 'John Doe' })
  .onConflictDoUpdate({
    target: schema.users.id,
    set: { name: 'John Doe' },
    setWhere: sql`name <> 'John Doe'`,
  })

// 2. Upsert with composite indexes, or composite primary keys for onConflictDoUpdate:
// await db.insert(schema.users)
// .values({ firstName: 'John', lastName: 'Doe' })
// .onConflictDoUpdate({
//   target: [schema.users.firstName, schema.users.lastName],
//   set: { firstName: 'John1' }
// });
