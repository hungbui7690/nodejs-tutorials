/*
  Executing statements in parallel with Database.parallelize
  - If you want the scheduled queries to execute in parallel, you place them in the parallelize() method.
  - Similar to the serialize() method, it is safe to nest the parallelize() method as follows:

      db.parallelize(() => {
        db.parallelize(() => {
        
        })
      })


***************************

  - For the demonstration, we will create a new function that calculates the sum of two numbers using SQLite database and place the function calls in the parallelize() method as shown in the following example:


*/

const sqlite3 = require('sqlite3').verbose()

// open a database connection
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message)
  }
})

db.parallelize(() => {
  dbSum(1, 1, db)
  dbSum(2, 2, db)
  dbSum(3, 3, db)
  dbSum(4, 4, db)
  dbSum(5, 5, db)
})

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message)
  }
})

function dbSum(a, b, db) {
  db.get('SELECT (? + ?) sum', [a, b], (err, row) => {
    if (err) {
      console.error(err.message)
    }
    console.log(`The sum of ${a} and ${b} is ${row.sum}`)
  })
}

// As you see in the output, the order of execution is not the same as it was called in the program.
// Notice that the statements execute in parallel, therefore, each time you run the program, the order of execution may be different.
