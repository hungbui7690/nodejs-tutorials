/*
  SQL Insert


*******************************

  # WITH INSERT clause
    - Using the with clause can help you simplify complex queries by splitting them into smaller subqueries called common table expressions (CTEs):


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sql } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

/*
  with "user_count" as (select count(*) as "value" from "users") 
    insert into "users" ("username", "admin") 
    values ($1, ((select * from "user_count") = 0)) 
    returning "admin"
*/

// 1.
const userCount = db
  .$with('user_count')
  .as(db.select({ value: sql`count(*)`.as('value') }).from(schema.users))

// 2.
const result = await db
  .with(userCount)
  .insert(schema.users)
  .values([{ name: 'john' }])
  .returning({
    admin: schema.users.name,
  })
