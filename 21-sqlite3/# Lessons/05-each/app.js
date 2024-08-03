/*
  Query rows with each() method
  - The each() method executes an SQL query with specified parameters and calls a callback for every row in the result set.

***************************

  db.each(sql,params, (err, result) => {})
  - If the result set is empty, the callback is never called. In case there is an error, the err parameter contains detailed information.


*/

// The following each.js program illustrates how to use the each() method to query customers’ data from the customers table.
const sqlite3 = require('sqlite3').verbose()

// open the database
let db = new sqlite3.Database('./db/chinook.db')

let sql = ` SELECT FirstName firstName,
                  LastName lastName,
                  Email email
            FROM customers
            WHERE Country = ?
            ORDER BY FirstName`

db.each(sql, ['USA'], (err, row) => {
  if (err) {
    throw err
  }
  console.log(`${row.firstName} ${row.lastName} - ${row.email}`)
})

// close the database connection
db.close()
