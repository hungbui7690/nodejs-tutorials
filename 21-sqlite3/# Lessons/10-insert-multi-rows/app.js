/*
  Insert multiple rows into a table at a time
  - To insert multiple rows at a time into a table, you use the following form of the INSERT statement:

      INSERT INTO table_name(column_name)
      VALUES(value_1), (value_2), (value_3),...

  - To simulate this in the Node.js application, we first need to construct the INSERT statement with multiple placeholders:

      INSERT INTO table_name(column_name)
      VALUES(?), (?), (?),...


*/

const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./db/sample.db')

// Suppose, you want to insert rows into the langs table with the data from the following languages array:
let languages = ['C++', 'Python', 'Java', 'C#', 'Go']

// To construct the INSERT statement, we use the map() method to map each element in the languages array into (?) and then join all placeholders together.
let placeholders = languages.map((language) => '(?)').join(',')
let sql = 'INSERT INTO langs(name) VALUES ' + placeholders

// output the INSERT statement
console.log(sql)

db.run(sql, languages, function (err) {
  if (err) {
    return console.error(err.message)
  }
  console.log(`Rows inserted ${this.changes}`)
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

// close the database connection
db.close()
