/*
  SQL Select
  
********************************

  # WITH clause
  - Using the with clause can help you simplify complex queries by splitting them into smaller subqueries called common table expressions (CTEs)


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, sql } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// with sq as (select "id", "name", "age" from "users" where "id" = 42)
// select "id", "name", "age" from sq;
const sq = db
  .$with('sq')
  .as(db.select().from(schema.users).where(eq(schema.users.id, 42)))
const result = await db.with(sq).select().from(sq)

// To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them -> using "as"
const sqx = db.$with('sq').as(
  db
    .select({
      name: sql<string>`upper(${schema.users.name})`.as('name'),
    })
    .from(schema.users)
)
const resultX = await db.with(sq).select({ name: sq.name }).from(sq)
