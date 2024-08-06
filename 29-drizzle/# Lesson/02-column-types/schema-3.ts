/*
  Text
  - A text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).
  - Note: You can define { enum: ["value1", "value2"] } config to infer insert and select types, it won’t check runtime values.


*/

import { text, sqliteTable } from 'drizzle-orm/sqlite-core'

// CREATE TABLE `table` (
//   `text` text
// );
const table = sqliteTable('table', {
  text: text('text'),
})

// will be inferred as text: "value1" | "value2" | null
text('text', { enum: ['value1', 'value2'] })
text('text', { mode: 'json' })
text('text', { mode: 'json' }).$type<{ foo: string }>()
