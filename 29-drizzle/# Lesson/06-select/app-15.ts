/*
  SQL Select
  
********************************

  # Aggregations helpers
  - A more advanced example -> setup new schema


*/

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { asc, desc, eq, gt, sql } from 'drizzle-orm'
import Database from 'better-sqlite3'

const sqlite = new Database('dev.db')
const db = drizzle(sqlite, { schema })

db.select({
  id: schema.orders.id,
  shippedDate: schema.orders.shippedDate,
  shipName: schema.orders.shipName,
  shipCity: schema.orders.shipCity,
  shipCountry: schema.orders.shipCountry,
  productsCount: sql<number>`cast(count(${schema.details.productId}) as int)`,
  quantitySum: sql<number>`sum(${schema.details.quantity})`,
  totalPrice: sql<number>`sum(${schema.details.quantity} * ${schema.details.unitPrice})`,
})
  .from(schema.orders)
  .leftJoin(schema.details, eq(schema.orders.id, schema.details.orderId))
  .groupBy(schema.orders.id)
  .orderBy(asc(schema.orders.id))
  .all()
