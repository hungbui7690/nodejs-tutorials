/*
  SQL Insert
  - Drizzle ORM provides you the most SQL-like way to insert rows into the database tables.

  # Upserts and conflicts
    -> Drizzle ORM provides simple interfaces for handling upserts and conflicts.

    ~~ On conflict do nothing -> onConflictDoNothing will cancel the insert if there’s a conflict



*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// 1.
const result = await db
  .insert(schema.users)
  .values({ id: 1, name: 'John' })
  .onConflictDoNothing()

// 2. target option
await db
  .insert(schema.users)
  .values({ id: 1, name: 'John' })
  .onConflictDoNothing({ target: schema.users.id })
