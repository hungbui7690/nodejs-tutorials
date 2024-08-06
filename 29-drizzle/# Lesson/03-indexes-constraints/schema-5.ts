/*
  # Constraints


*****************************

  # Composite Primary Key
  - Just like PRIMARY KEY, composite primary key uniquely identifies each record in a table using multiple fields.
  - Drizzle ORM provides a standalone primaryKey operator for that


*/

import { integer, text, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
})
export const book = sqliteTable('book', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
})
export const bookToAuthor = sqliteTable(
  'book_to_author',
  {
    authorId: integer('author_id'),
    bookId: integer('book_id'),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.bookId, table.authorId] }),
      pkWithCustomName: primaryKey({
        name: 'custom_name',
        columns: [table.bookId, table.authorId],
      }),
    }
  }
)
/*
  CREATE TABLE `book_to_author` (
    `author_id` integer,
    `book_id` integer,
    PRIMARY KEY(`book_id`, `author_id`)
  );
*/
