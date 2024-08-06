/*
  Customizing column data type
  - Every column builder has a .$type() method, which allows you to customize the data type of the column. This is useful, for example, with unknown or branded types.


*/

import { blob, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

type UserId = number & { __brand: 'user_id' }
type Data = {
  foo: string
  bar: number
}

const users = sqliteTable('users', {
  id: integer('id').$type<UserId>().primaryKey(),
  jsonField: blob('json_field').$type<Data>(),
})
