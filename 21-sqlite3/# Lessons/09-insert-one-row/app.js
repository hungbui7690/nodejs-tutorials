/*
  Insert one row into a table
  - To execute an INSERT statement, you use the run() method of the Database object:

      db.run(sql, params, function(err){})


*/

const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./db/sample.db')

//************************
// insert one row into the langs table
db.run(`INSERT INTO langs(name) VALUES(?)`, ['C'], function (err) {
  if (err) {
    return console.log(err.message)
  }
  // get the last insert id
  console.log(`A row has been inserted with rowid ${this.lastID}`)
})

//************************
// TEST
//************************
let sql = ` SELECT * FROM langs`

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err
  }
  rows.forEach((row) => {
    console.log(row.name)
  })
})

// close the database connection
db.close()
