/*
  Transactions
  - SQL transaction is a grouping of one or more SQL statements that interact with a database. 
  - A transaction in its entirety can commit to a database as a single logical unit or rollback (become undone) as a single logical unit.


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, gt, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })
const { users, accounts } = schema

// You can return values from the transaction:
const newBalance: number = await db.transaction(async (tx) => {
  await tx
    .update(accounts)
    .set({ balance: sql`${accounts.balance} - 100.00` })
    .where(eq(users.name, 'Dan'))
  await tx
    .update(accounts)
    .set({ balance: sql`${accounts.balance} + 100.00` })
    .where(eq(users.name, 'Andrew'))
  const [account] = await tx
    .select({ balance: accounts.balance })
    .from(accounts)
    .where(eq(users.name, 'Dan'))
  return account.balance
})

console.log(newBalance)
