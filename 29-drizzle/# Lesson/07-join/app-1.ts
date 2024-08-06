/*
  JOIN

    1. npx drizzle-kit generate
    2. npx drizzle-kit migrate
    3. tsx --watch app.ts


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, gt, sql } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })
const { users, pets } = schema

// 1. Left Join
// select ... from "users" left join "pets" on "users"."id" = "pets"."owner_id"
const resultLeft = await db
  .select()
  .from(users)
  .leftJoin(pets, eq(users.id, pets.ownerId))

console.log(resultLeft)

// 2. Right Join
// select ... from "users" right join "pets" on "users"."id" = "pets"."owner_id"
const resultRight = await db
  .select()
  .from(users)
  .rightJoin(pets, eq(users.id, pets.ownerId))

// 3. Inner Join
// select ... from "users" inner join "pets" on "users"."id" = "pets"."owner_id"
const resultInner = await db
  .select()
  .from(users)
  .innerJoin(pets, eq(users.id, pets.ownerId))

// 4. Full Join
// select ... from "users" full join "pets" on "users"."id" = "pets"."owner_id"
const resultFull = await db
  .select()
  .from(users)
  .fullJoin(pets, eq(users.id, pets.ownerId))
