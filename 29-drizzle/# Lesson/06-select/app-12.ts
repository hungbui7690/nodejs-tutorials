/*
  SQL Select
  
********************************

  # Aggregations
  - With Drizzle, you can do aggregations using functions like sum, count, avg, etc. by grouping and filtering with .groupBy() and .having() respectfully, same as you would do in raw SQL:


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, gt, sql } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

/*
  select "age", cast(count("id") as int)
  from "users"
  group by "age";
*/
await db
  .select({
    age: schema.users.age,
    count: sql<number>`cast(count(${schema.users.id}) as int)`,
  })
  .from(schema.users)
  .groupBy(schema.users.age)

/*
  select "age", cast(count("id") as int)
    from "users"
    group by "age"
    having cast(count("id") as int) > 1;
*/
await db
  .select({
    age: schema.users.age,
    count: sql<number>`cast(count(${schema.users.id}) as int)`,
  })
  .from(schema.users)
  .groupBy(schema.users.age)
  .having(({ count }) => gt(count, 1))

// 🎯 cast(... as int) is necessary because count() returns bigint in PostgreSQL and decimal in MySQL, which are treated as string values instead of numbers. Alternatively, you can use .mapWith(Number) to cast the value to a number at runtime.
