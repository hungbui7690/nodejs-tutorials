/*
  Basic Types
  - In most situations, all you need to do is to specify the types for your API using the GraphQL schema language, taken as an argument to the buildSchema function.
  - The GraphQL schema language supports the scalar types of String, Int, Float, Boolean, and ID, so you can use these directly in the schema you pass to buildSchema.

  - By default, every type is nullable - it’s legitimate to return null as any of the scalar types. Use an exclamation point to indicate a type cannot be nullable, so String! is a non-nullable string.
  - To use a list type, surround the type in square brackets, so [Int] is a list of integers.
  - Each of these types maps straightforwardly to JavaScript, so you can just return plain old JavaScript objects in APIs that return these types. Here’s an example that shows how to use some of these basic types


*****************************




*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
const { ruruHTML } = require('ruru/server')
app.use(express.static('./public'))

// 1. Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`)

// 2. The root provides a resolver function for each API endpoint
var root = {
  quoteOfTheDay() {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'
  },
  random() {
    return Math.random()
  },
  rollThreeDice() {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6))
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
