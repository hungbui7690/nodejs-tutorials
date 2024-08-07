/*
  Mutations and Input Types
  - If you have an API endpoint that alters data, like inserting data into a database or altering data already in a database, you should make this endpoint a Mutation rather than a Query. This is as simple as making the API endpoint part of the top-level Mutation type instead of the top-level Query type.


*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
const { ruruHTML } = require('ruru/server')
app.use(express.static('./public'))

// 1. Let’s say we have a “message of the day” server, where anyone can update the message of the day, and anyone can read the current one. The GraphQL schema for this is simply:
var schema = buildSchema(/* GraphQL */ `
  type Mutation {
    setMessage(message: String): String
  }

  type Query {
    getMessage: String
  }
`)

// 2. It’s often convenient to have a mutation that maps to a database create or update operation, like setMessage, return the same thing that the server stored. That way, if you modify the data on the server, the client can learn about those modifications.
// Both mutations and queries can be handled by root resolvers, so the root that implements this schema can simply be:
var fakeDatabase = {}
var root = {
  setMessage({ message }) {
    fakeDatabase.message = message
    return message
  },
  getMessage() {
    return fakeDatabase.message
  },
}

app.get('/ruru', (_req, res) => {
  res.type('html')
  res.end(ruruHTML({ endpoint: '/graphql' }))
})

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

app.listen(5000)
console.log('Running a GraphQL API server at http://localhost:5000/graphql')
