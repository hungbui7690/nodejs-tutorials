/*
  Blob
  - A blob of data, stored exactly as it was input.


*************************

  Note
  - It’s recommended to use text('', { mode: 'json' }) instead of blob('', { mode: 'json' }), because it supports JSON functions:
  - All JSON functions currently throw an error if any of their arguments are BLOBs because BLOBs are reserved for a future enhancement in which BLOBs will store the binary encoding for JSON.

    -> See https://www.sqlite.org/json1.html.


*/

import { blob, sqliteTable } from 'drizzle-orm/sqlite-core'

// CREATE TABLE `table` (
//   `blob` blob
// );
const table = sqliteTable('table', {
  blob: blob('blob'),
})

blob('blob')
blob('blob', { mode: 'buffer' })
blob('blob', { mode: 'bigint' })
blob('blob', { mode: 'json' })
blob('blob', { mode: 'json' }).$type<{ foo: string }>()

// You can specify .$type<..>() for blob inference, it won’t check runtime values. It provides compile time protection for default values, insert and select schemas.
// will be infered as { foo: string }
json: blob('json', { mode: 'json' }).$type<{ foo: string }>()
// will be infered as string[]
json: blob('json', { mode: 'json' }).$type<string[]>()
// won't compile
json: blob('json', { mode: 'json' }).$type<string[]>().default({})
