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

  # Conditional select
    - You can have a dynamic selection object based on some condition

  
********************************

  # Filtering
    - You can filter the query results using the filter operators in the .where() method

    -> All the values provided to filter operators and to the sql function are parameterized automatically. For example, this query:
        await db.select().from(users).where(eq(users.id, 42));

    -> will be translated to:
        select "id", "name", "age" from "users" where "id" = $1; -- params: [42]


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { type Column, sql, eq, lt, gte, ne, not } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// 1. Conditional select
async function selectUsers(withName: boolean) {
  return db
    .select({
      id: schema.users.id,
      ...(withName ? { name: schema.users.name } : {}),
    })
    .from(schema.users)
}
const users = await selectUsers(true)
console.log(users)

// 2. Filtering
// select "id", "name", "age" from "users" where "id" = 42;
// select "id", "name", "age" from "users" where "id" < 42;
// select "id", "name", "age" from "users" where "id" >= 42;
// select "id", "name", "age" from "users" where "id" <> 42;
await db.select().from(schema.users).where(eq(schema.users.id, 42))
await db.select().from(schema.users).where(lt(schema.users.id, 42))
await db.select().from(schema.users).where(gte(schema.users.id, 42))
await db.select().from(schema.users).where(ne(schema.users.id, 42))

// All filter operators are implemented using the sql function. You can use it yourself to write arbitrary SQL filters, or build your own operators. For inspiration, you can check how the operators provided by Drizzle are implemented.
function equals42(col: Column) {
  return sql`${col} = 42`
}

await db
  .select()
  .from(schema.users)
  .where(sql`${schema.users.id} < 42`)

await db
  .select()
  .from(schema.users)
  .where(sql`${schema.users.id} = 42`)

await db.select().from(schema.users).where(equals42(schema.users.id))

await db
  .select()
  .from(schema.users)
  .where(sql`${schema.users.id} >= 42`)

await db
  .select()
  .from(schema.users)
  .where(sql`${schema.users.id} <> 42`)

// select "id", "name", "age" from "users" where lower("name") = 'aaron';
await db
  .select()
  .from(schema.users)
  .where(sql`lower(${schema.users.name}) = 'aaron'`)

// 4. Inverting condition with a not operator:
await db
  .select()
  .from(schema.users)
  .where(not(eq(schema.users.id, 42)))
await db
  .select()
  .from(schema.users)
  .where(sql`not ${schema.users.id} = 42`)
