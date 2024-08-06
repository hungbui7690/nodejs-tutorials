/*
  Aliases & Selfjoins
  - Drizzle ORM supports table aliases which comes really handy when you need to do selfjoins.


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, gt, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })
const { user } = schema

const parent = alias(user, 'parent')
const result = db.select().from(user).leftJoin(parent, eq(parent.id, user.id))
console.log(result)
