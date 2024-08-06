/*
  Prepared Statement


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, gt, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })
const { users } = schema

const prepared = db.select().from(users).prepare()

// .all() -> execute
const res1 = prepared.all()
const res2 = prepared.all()
const res3 = prepared.all()
