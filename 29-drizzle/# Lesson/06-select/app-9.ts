/*
  SQL Select
  
********************************

  # Order By
  - Use .orderBy() to add order by clause to the query, sorting the results by the specified fields


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// 1. select "id", "name", "age" from "users" order by "name";
await db.select().from(schema.users).orderBy(schema.users.name)

// select "id", "name", "age" from "users" order by "name" desc;
await db.select().from(schema.users).orderBy(desc(schema.users.name))

// 2. order by multiple fields
// select "id", "name", "age" from "users" order by "name", "name2";
await db
  .select()
  .from(schema.users)
  .orderBy(schema.users.name, schema.users.age)

// select "id", "name", "age" from "users" order by "name" asc, "name2" desc;
await db
  .select()
  .from(schema.users)
  .orderBy(asc(schema.users.name), desc(schema.users.age))
