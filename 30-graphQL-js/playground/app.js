/*
  Constructing Types
  - We can implement this same API without using GraphQL schema language
    - we don't need root


****************************

  - When we use this method of creating the API, the root level resolvers are implemented on the Query and Mutation types rather than on a root object.
  - This is particularly useful if you want to create a GraphQL schema automatically from something else, like a database schema. You might have a common format for something like creating and updating database records. This is also useful for implementing features like union types which don’t map cleanly to ES6 classes and schema language.


*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
var graphql = require('graphql')
const { ruruHTML } = require('ruru/server')
app.use(express.static('./public'))

// Maps id to User object
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

// Define the User type
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  },
})

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: (_, { id }) => {
        return fakeDatabase[id]
      },
    },
  },
})

var schema = new graphql.GraphQLSchema({ query: queryType })

app.get('/ruru', (_req, res) => {
  res.type('html')
  res.end(ruruHTML({ endpoint: '/graphql' }))
})

app.all(
  '/graphql',
  createHandler({
    schema: schema,
  })
)

app.listen(5000)
console.log('Running a GraphQL API server at http://localhost:5000/graphql')
