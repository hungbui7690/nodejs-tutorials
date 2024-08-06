/*
  Partial Select

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

// 1. Partial select
// If you need to select a particular subset of fields or to have a flat response type, Drizzle ORM supports joins with partial select and will automatically infer return type based on .select({ ... }) structure.
// select "users"."id", "pets","id" from "users" left join "pets" on "users"."id" = "pets"."owner_id"
await db
  .select({
    userId: users.id,
    petId: pets.id,
  })
  .from(users)
  .leftJoin(pets, eq(users.id, pets.ownerId))
// You might’ve noticed that petId can be null now, it’s because we’re left joining and there can be users without a pet.

// 2. It’s very important to keep in mind when using sql operator for partial selection fields and aggregations when needed, you should to use sql<type | null> for proper result type inference, that one is on you!
// select "users"."id", "pets"."id", upper("pets"."name")... from "users" left join "pets" on "users"."id" = "pets"."owner_id"
const result = await db
  .select({
    userId: users.id,
    petId: pets.id,
    petName1: sql`upper(${pets.name})`,
    petName2: sql<string | null>`upper(${pets.name})`,
    //˄we should explicitly tell 'string | null' in type, since we're left joining that field
  })
  .from(users)
  .leftJoin(pets, eq(users.id, pets.ownerId))

// 3. To avoid plethora of nullable fields when joining tables with lots of columns we can utilize our nested select object syntax, our smart type inference will make whole object nullable instead of making all table fields nullable!
// select ... from "users" full join "pets" on "users"."id" = "pets"."owner_id"
await db
  .select({
    userId: users.id,
    userName: users.name,
    pet: {
      id: pets.id,
      name: pets.name,
      upperName: sql<string>`upper(${pets.name})`,
    },
  })
  .from(users)
  .fullJoin(pets, eq(users.id, pets.ownerId))
