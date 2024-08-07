/*
  Constructing Types
  - For many apps, you can define a fixed schema when the application starts, and define it using GraphQL schema language. In some cases, it’s useful to construct a schema programmatically. You can do this using the GraphQLSchema constructor.
  - When you are using the GraphQLSchema constructor to create a schema, instead of defining Query and Mutation types solely using schema language, you create them as separate object types.




*****************************

  - For example, let’s say we are building a simple API that lets you fetch user data for a few hardcoded users based on an id. Using buildSchema we could write a server with


*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
const { ruruHTML } = require('ruru/server')
app.use(express.static('./public'))

// 1.
var schema = buildSchema(`
  type User {
    id: String
    name: String
  }
 
  type Query {
    user(id: String): User
  }
`)

// 2. Maps id to User object
var fakeDatabase = {
  a: {
    id: 'a',
    name: 'alice',
  },
  b: {
    id: 'b',
    name: 'bob',
  },
}

// 3.
var root = {
  user({ id }) {
    return fakeDatabase[id]
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
