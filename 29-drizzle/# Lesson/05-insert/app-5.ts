/*
  SQL Insert
  - Drizzle ORM provides you the most SQL-like way to insert rows into the database tables.

    # On conflict do update -> will update the row if there’s a conflict



*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// set id = 1 and name = 'Dan'
const result = await db
  .insert(schema.users)
  .values({ id: 1, name: 'Dan' })
  .onConflictDoUpdate({ target: schema.users.id, set: { name: 'John' } })
