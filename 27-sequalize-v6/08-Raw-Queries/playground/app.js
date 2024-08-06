/*
  Raw Queries
  - As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can use the sequelize.query method.

  - By default the function will return two arguments - a results array, and an object containing metadata (such as amount of affected rows, etc). Note that since this is a raw query, the metadata are dialect specific. Some dialects return the metadata "within" the results object (as properties on an array). However, two arguments will always be returned, but for MSSQL and MySQL it will be two references to the same object.


*/

const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
})

// 1. Results will be an empty array and metadata will contain the number of affected rows.
const [results, metadata] = await sequelize.query(
  'UPDATE users SET y = 42 WHERE x = 12'
)

// 2. In cases where you don't need to access the metadata you can pass in a query type to tell sequelize how to format the results. For example, for a simple select query you could do:
// https://github.com/sequelize/sequelize/blob/v6/src/query-types.js
const { QueryTypes } = require('sequelize')
const users = await sequelize.query('SELECT * FROM `users`', {
  type: QueryTypes.SELECT,
})
// We didn't need to destructure the result here - the results were returned directly

// 3. A second option is the model. If you pass a model the returned data will be instances of that model.
// Callee is the model definition. This allows you to easily map a query to a predefined model
const projects = await sequelize.query('SELECT * FROM projects', {
  model: Projects,
  mapToModel: true, // pass true here if you have any mapped fields
})
// Each element of `projects` is now an instance of Project

// 4. See more options in the query API reference. Some examples:
const { QueryTypes } = require('sequelize')
await sequelize.query('SELECT 1', {
  // A function (or false) for logging your queries
  // Will get called for every SQL query that gets sent
  // to the server.
  logging: console.log,

  // If plain is true, then sequelize will only return the first
  // record of the result set. In case of false it will return all records.
  plain: false,

  // Set this to true if you don't have a model definition for your query.
  raw: false,

  // The type of query you are executing. The query type affects how results are formatted before they are passed back.
  type: QueryTypes.SELECT,
})

// Note the second argument being null!
// Even if we declared a callee here, the raw: true would
// supersede and return a raw object.
console.log(await sequelize.query('SELECT * FROM projects', { raw: true }))
