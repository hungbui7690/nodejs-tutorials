/*
  Placeholder


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, gt, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })
const { users } = schema

const p1 = db
  .select()
  .from(users)
  .where(eq(users.id, sql.placeholder('id')))
  .prepare()

// exec with param
p1.get({ id: 10 }) // SELECT * FROM customers WHERE id = 10
p1.get({ id: 12 }) // SELECT * FROM customers WHERE id = 12

const p2 = db
  .select()
  .from(users)
  .where(sql`lower(${users.name}) like ${sql.placeholder('name')}`)
  .prepare()

// exec with param
p2.all({ name: '%an%' }) // SELECT * FROM customers WHERE name ilike '%an%'
