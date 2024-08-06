/*
  Drizzle Queries
  - Drizzle ORM is designed to be a thin typed layer on top of SQL. We truly believe we’ve designed the best way to operate an SQL database from TypeScript and it’s time to make it better.
  - Relational queries are meant to provide you with a great developer experience for querying nested relational data from an SQL database, avoiding multiple joins and complex data mappings.
  - It is an extension to the existing schema definition and query builder. You can opt-in to use it based on your needs. We’ve made sure you have both the best-in-class developer experience and performance.


  1. npx drizzle-kit generate
  2. npx drizzle-kit migrate
  3. tsx --watch app.ts


********************************

  SQL Insert
  - Drizzle ORM provides you the most SQL-like way to insert rows into the database tables.

  # Insert one row


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// Method 1: without type
// await db.insert(users).values({ name: 'Andrew' });

// Method 2: with type
type NewUser = typeof schema.users.$inferInsert

const insertUser = async (user: NewUser) => {
  return db.insert(schema.users).values(user)
}

const newUser: NewUser = { name: 'Alex' }
// await insertUser(newUser)
