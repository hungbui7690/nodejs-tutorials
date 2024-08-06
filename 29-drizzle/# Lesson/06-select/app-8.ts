/*
  SQL Select
  
********************************

  # Limit & offset
    - Use .limit() and .offset() to add limit and offset clauses to the query - for example, to implement pagination


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { type Column, sql, eq, lt, gte, ne, not, and } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// select "id", "name", "age" from "users" limit 10;
await db.select().from(schema.users).limit(10)

// select "id", "name", "age" from "users" limit 10 offset 10;
await db.select().from(schema.users).limit(10).offset(10)
