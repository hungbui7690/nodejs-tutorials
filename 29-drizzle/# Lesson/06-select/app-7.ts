/*
  SQL Select
  
********************************

  # Distinct
    - You can use .selectDistinct() instead of .select() to retrieve only unique rows from a dataset


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { type Column, sql, eq, lt, gte, ne, not, and } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

// select distinct "id", "name" from "users" order by "id", "name";
const resultX = await db
  .selectDistinct()
  .from(schema.users)
  .orderBy(schema.users.id, schema.users.name)
console.log('resultX: ', resultX)

// select distinct "id" from "schema.users" order by "id";
const resultZ = await db
  .selectDistinct({ id: schema.users.id })
  .from(schema.users)
  .orderBy(schema.users.id)
console.log('resultZ: ', resultZ)
