/*
  SQL Insert
  - Drizzle ORM provides you the most SQL-like way to insert rows into the database tables.

  # Insert multiple rows


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

const result = await db
  .insert(schema.users)
  .values([{ name: 'David' }, { name: 'Jackson' }])
  .returning()

console.log(result)
