/*
  SQL Select

********************************

  # Partial select
  -> In some cases, you might want to select only a subset of columns from a table. You can do that by providing a selection object to the .select() method


********************************

  🎈 By specifying sql<string>, you are telling Drizzle that the expected type of the field is string.
If you specify it incorrectly (e.g. use sql<number> for a field that will be returned as a string), the runtime value won’t match the expected type. Drizzle cannot perform any type casts based on the provided type generic, because that information is not available at runtime.

  🎈 If you need to apply runtime transformations to the returned value, you can use the .mapWith() method.


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { type Column, sql } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// 1. select "id", "name" from "users";
const result = await db
  .select({
    id: schema.users.id,
    name: schema.users.name,
  })
  .from(schema.users)

const { id, name } = result[0]
console.log(id, name)

// 2. Like in SQL, you can use arbitrary expressions as selection fields, not just table columns:
// select "id", lower("name") from "users";
const resultX = await db
  .select({
    id: schema.users.id,
    lowerName: sql<string>`lower(${schema.users.name})`,
  })
  .from(schema.users)

console.log(resultX)

// 3. If you have an expression you use frequently, you can extract it into a function:
function lower(col: Column) {
  return sql<string>`lower(${col})`
}

const resultZ = await db
  .select({
    id: schema.users.id,
    lowercaseName: lower(schema.users.name),
  })
  .from(schema.users)

console.log(resultZ)
