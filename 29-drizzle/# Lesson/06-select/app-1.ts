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

  # Select with all columns
    -> Select all rows from a table including all columns:

    -> Notice that the result type is inferred automatically based on the table definition, including columns nullability.

    - Note: 
      -> Drizzle always explicitly lists columns in the select clause instead of using select *.
      -> This is required internally to guarantee the fields order in the query result, and is also generally considered a good practice.


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sql } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// select "id", "name", "age" from "users";
const result = await db.select().from(schema.users)
console.log(result)
