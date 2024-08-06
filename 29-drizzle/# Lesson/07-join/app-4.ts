/*
  Many to One
  1. npx drizzle-kit generate
  2. npx drizzle-kit migrate
  3. tsx --watch app.ts


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, gt, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })
const { users, cities } = schema

// querying user and all the participants(users)
const result = await db
  .select()
  .from(cities)
  .leftJoin(users, eq(cities.id, users.cityId))
  .all()

console.log(result)
