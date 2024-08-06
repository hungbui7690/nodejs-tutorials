import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core'

export const orders = sqliteTable('order', {
  id: integer('id').primaryKey(),
  orderDate: integer('order_date', { mode: 'timestamp' }).notNull(),
  requiredDate: integer('required_date', { mode: 'timestamp' }).notNull(),
  shippedDate: integer('shipped_date', { mode: 'timestamp' }),
  shipVia: integer('ship_via').notNull(),
  freight: numeric('freight').notNull(),
  shipName: text('ship_name').notNull(),
  shipCity: text('ship_city').notNull(),
  shipRegion: text('ship_region'),
  shipPostalCode: text('ship_postal_code'),
  shipCountry: text('ship_country').notNull(),
  customerId: text('customer_id').notNull(),
  employeeId: integer('employee_id').notNull(),
})

export const details = sqliteTable('order_detail', {
  unitPrice: numeric('unit_price').notNull(),
  quantity: integer('quantity').notNull(),
  discount: numeric('discount').notNull(),
  orderId: integer('order_id').notNull(),
  productId: integer('product_id').notNull(),
})
