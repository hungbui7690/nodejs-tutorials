/*
  Real
  - A floating point value, stored as an 8-byte IEEE floating point number.


*/

import { real, sqliteTable } from 'drizzle-orm/sqlite-core'

/*
  CREATE TABLE `table` (
    `real` real
  );
*/
const table = sqliteTable('table', {
  real: real('real'),
})
