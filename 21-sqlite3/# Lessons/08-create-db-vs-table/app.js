/*
  Inserting Data Into an SQLite Table
  - For the demonstration, we will create a new database named sample.db in the db folder.


*/

const sqlite3 = require('sqlite3').verbose()

// When you open a database connection in the default mode, the database is created if it does not exist.
let db = new sqlite3.Database('./db/sample.db')

// In the sample.db database, we create a table called langs for storing programming languages:
db.run('CREATE TABLE langs(name text)')
