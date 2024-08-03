/*
  Connecting to the in-memory database


*/

// First, import the sqlite3 module:
// Notice that the execution mode is set to verbose to produce long stack traces.
const sqlite3 = require('sqlite3').verbose()

/*
  The sqlite3.Database() returns a Database object and opens the database connection automatically.

  The sqlite3.Database() accepts a callback function that will be called when the database opened successfully or when an error occurred.

  The callback function has the error object as the first parameter. If an error occurred, the error object is not null, otherwise, it is null.

  If you don’t provide the callback function and an error occurred during opening the database, an error event will be emitted. In case the database is opened successfully, the open event is emitted regardless of whether a callback is provided or not.
*/

// So you now can open an SQLite database and provide the detailed information if an error occurred as follows:
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Connected to the in-memory SQlite database.')
})

// It is a good practice to close a database connection when you are done with it. To close a database connection, you call the close() method of the Database object as follows:
// db.close()

// The close() method will wait for all pending queries completed before actually closing the database.
// Similar to the Database(), the close() method also accepts a callback that indicates whether an error occurred during closing the database connection.
db.close((err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Close the database connection.')
})
