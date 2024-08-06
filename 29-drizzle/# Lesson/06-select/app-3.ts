/*
  SQL Select
  - Drizzle provides you the most SQL-like way to fetch data from your database, while remaining type-safe and composable. It natively supports mostly every query feature and capability of every dialect, and whatever it doesn’t support yet, can be added by the user with the powerful sql operator.
  - For the following examples, define a new table Users with id, name, age

    1. npx drizzle-kit generate
    2. npx drizzle-kit migrate
    3. tsx --watch app.ts


    INSERT INTO USERS (name, age) VALUES 
    ('Dan', 18),
    ('Alex', 22);

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
import { sql } from 'drizzle-orm'
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
