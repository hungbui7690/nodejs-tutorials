/*
  SQL Select
  
********************************

  # Combining filters
    - You can logically combine filter operators with and() and or() operators


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { type Column, sql, eq, lt, gte, ne, not, and } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// select "id", "name", "age" from "users" where "id" = 42 and "name" = 'Dan';
await db
  .select()
  .from(schema.users)
  .where(and(eq(schema.users.id, 42), eq(schema.users.name, 'Dan')))

// select "id", "name", "age" from "users" where "id" = 42 and "name" = 'Dan';
await db
  .select()
  .from(schema.users)
  .where(sql`${schema.users.id} = 42 and ${schema.users.name} = 'Dan'`)
