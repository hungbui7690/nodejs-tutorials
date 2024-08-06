/*
  SQL Select
  
********************************

  # Select from subquery


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, sql } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// 1. select "id", "name", "age" from (select "id", "name", "age" from "users" where "id" = 42) "sq";
const sq = db
  .select()
  .from(schema.users)
  .where(eq(schema.users.id, 42))
  .as('sq')
const result = await db.select().from(sq)

// 2. Subqueries can be used in any place where a table can be used, for example in joins:
// select "users"."id", "users"."name", "users"."age", "sq"."id", "sq"."name", "sq"."age" from "users"
//   left join (select "id", "name", "age" from "users" where "id" = 42) "sq"
//   on "users"."id" = "sq"."id";
const sqX = db
  .select()
  .from(schema.users)
  .where(eq(schema.users.id, 42))
  .as('sq')
const resultX = await db
  .select()
  .from(schema.users)
  .leftJoin(sq, eq(schema.users.id, sq.id))
