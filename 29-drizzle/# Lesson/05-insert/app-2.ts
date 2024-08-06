/*
  SQL Insert
  - Drizzle ORM provides you the most SQL-like way to insert rows into the database tables.

  # Insert returning
    -> You can insert a row and get it back in PostgreSQL and SQLite like such


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// Full return
const result = await db.insert(schema.users).values({ name: 'Dan' }).returning()
console.log('result: ', result)

// Partial return
const partial = await db
  .insert(schema.users)
  .values({ name: 'Partial Dan' })
  .returning({ insertedId: schema.users.id })
console.log('partial: ', partial)
