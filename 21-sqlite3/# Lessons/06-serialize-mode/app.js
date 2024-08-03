/*
  Controlling the Execution Flow of Statements
  - The sqlite3 module provides you with two methods for controlling the execution flow of statements. The serialize() method allows you to execute statements in serialized mode, while the parallelize() method executes the statements in parallel.


***************************

  Executing statement in serialized mode with Database.serialize
  - The serialize() method puts the execution mode into serialized mode. It means that only one statement can execute at a time. Other statements will wait in a queue until all the previous statements are executed.
  - After the serialize() method returns, the execution mode is set to the original mode again.
  - It’s safe to nest the serialize() method as follows:


  - queries will execute in serialized mode
    db.serialize(() => {
      db.serialize(() => {

      })
    });

***************************
  - Suppose, you want to execute the following three statements in sequence:
    + Create a new table.
    + Insert data into the table.
    + Query data from the table.
  - To do this, you place these statements in the serialize() method as follows:

*/

const sqlite3 = require('sqlite3').verbose()

// open the database connection
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message)
  }
})

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run('CREATE TABLE greetings(message text)')
    .run(
      `INSERT INTO greetings(message)
          VALUES('Hi'),
                ('Hello'),
                ('Welcome')`
    )
    .each(`SELECT message FROM greetings`, (err, row) => {
      if (err) {
        throw err
      }
      console.log(row.message)
    })
})

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message)
  }
})

// Notice that if you don’t place three statements in the serialize() method, all the three statements may execute in parallel which would cause an error.
