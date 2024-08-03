/*
  Query the first row in the result set
  - When you know that the result set contains zero or one row e.g., querying a row based on the primary key or querying with only one aggregate function such as count, sum, max, min, etc., you can use the get() method of Database object.

***************************

  - The all() method allows you to execute an SQL query with specified parameters and call a callback to access the rows in the result set.

***************************

  db.get(sql, params, (err, row) => {})
  - The get() method executes an SQL query and calls the callback function on the first result row. In case the result set is empty, the row argument is undefined.


*/

// The following get.js program demonstrates how to query a playlist by its id:
const sqlite3 = require('sqlite3').verbose()

// open the database
let db = new sqlite3.Database('./db/chinook.db')

let sql = ` SELECT PlaylistId id,
              Name name
            FROM playlists
            WHERE PlaylistId  = ?`
let playlistId = 1

// first row only
db.get(sql, [playlistId], (err, row) => {
  if (err) {
    return console.error(err.message)
  }
  return row
    ? console.log(row.id, row.name)
    : console.log(`No playlist found with the id ${playlistId}`)
})

// close the database connection
db.close()
