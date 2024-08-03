/*
  Updating Data in SQLite Database
  - To update data in a table, you use the UPDATE statement as follows:

      UPDATE table_name
      SET column_name = value_1
      WHERE id = id_value;

  - To execute the UPDATE statement in the Node.js application, you call the run() method of the Database object:

      db.run(sql, params, function(err){

      })

  - The run() method executes an UPDATE statement with specified parameters and calls a callback afterwards.
  - The err argument of the callback stores the error detail in case the execution has any problem e.g., syntax error, locking, etc.
  - If the UPDATE statement is executed successfully, the this object of the callback function will contain the changes property that stores the number of rows updated.


****************************

  - The following update.js program illustrates how to update a row in the langs table from C to Ansi C:

*/

const sqlite3 = require('sqlite3').verbose()

// open a database connection
let db = new sqlite3.Database('./db/sample.db')

//
let data = ['Ansi C', 'C']
let sql = `UPDATE langs
            SET name = ?
            WHERE name = ?`

db.run(sql, data, function (err) {
  if (err) {
    return console.error(err.message)
  }
  console.log(`Row(s) updated: ${this.changes}`)
})

//************************
// TEST
//************************
sql = ` SELECT * FROM langs`

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err
  }
  rows.forEach((row) => {
    console.log(row.name)
  })
})

db.close()
