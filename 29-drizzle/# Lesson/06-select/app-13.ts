/*
  SQL Select
  
********************************

  # Aggregations helpers
  - Drizzle has a set of wrapped sql functions, so you don’t need to write sql templates for common cases in your app

  💡 Remember, aggregation functions are often used with the GROUP BY clause of the SELECT statement. So if you are selecting using aggregating functions and other columns in one query, be sure to use the .groupBy clause

    -> count, countDistinct, avg, avgDistinct, sum, sumDistinct, max, min...


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, gt, sql, count } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// 1. select count("*") from "users";
await db.select({ value: count() }).from(schema.users)

// select count("id") from "users";
await db.select({ value: count(schema.users.id) }).from(schema.users)

// 2. It's equivalent to writing
await db
  .select({
    value: sql`count('*'))`.mapWith(Number),
  })
  .from(schema.users)
await db
  .select({
    value: sql`count(${schema.users.id})`.mapWith(Number),
  })
  .from(schema.users)
