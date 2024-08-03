/*
  Connecting to a disk file database
  - To connect to a disk file database, instead of passing the ':memory:' string, you pass the path to the database file.

*/

const sqlite3 = require('sqlite3').verbose()

// 1. For example, to connect to the chinook database file stored in the db folder, you use the following statement:
// let db = new sqlite3.Database('./db/chinook.db', (err) => {
//   if (err) {
//     console.error(err.message)
//   }
//   console.log('Connected to the chinook database.')
// })

/*
  There are three opening modes:

  + sqlite3.OPEN_READONLY: open the database for read-only.
  + sqlite3.OPEN_READWRITE : open the database for reading and writing.
  + sqlite3.OPEN_CREATE: open the database, if the database does not exist, create a new database.
  
  The sqlite3.Database() accepts one or more mode as the second argument. By default, it uses the OPEN_READWRITE | OPEN_CREATE mode. It means that if the database does not exist, the new database will be created and is ready for read and write.
*/

// 2. To open the chinook sample database for read and write, you can do it as follows:
// The following example shows the complete code for opening the chinook database, querying data from the playlists table, and closing the database connection.
let db = new sqlite3.Database(
  './db/chinook.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Connected to the chinook database.')
  }
)

db.serialize(() => {
  db.each(
    `SELECT PlaylistId as id, Name as name
    FROM playlists`,
    (err, row) => {
      if (err) {
        console.error(err.message)
      }
      console.log(row.id + '\t' + row.name)
    }
  )
})

db.close((err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Close the database connection.')
})
