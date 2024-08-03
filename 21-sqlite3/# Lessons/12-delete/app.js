/*
  Deleting Data
  - To delete data from a table, you use the DELETE statement as follows:

      DELETE FROM table_name
      WHERE column_name = value;

  - To execute the DELETE statement from a Node.js application, you call the run() method of the Database object as follows:

      db.run(sql, params, function(err) {
      
      });


*/

const sqlite3 = require('sqlite3').verbose()

// open a database connection
let db = new sqlite3.Database('./db/sample.db', (err) => {
  if (err) {
    console.error(err.message)
  }
})

let id = 1

// delete a row based on id
db.run(`DELETE FROM langs WHERE rowid=?`, id, function (err) {
  if (err) {
    return console.error(err.message)
  }
  console.log(`Row(s) deleted ${this.changes}`)
})

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message)
  }
})
