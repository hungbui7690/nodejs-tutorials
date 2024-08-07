/*
  GraphQL Clients
  - In previous example, the query was just a hardcoded string. 
  - As your application becomes more complex, and you add GraphQL endpoints that take arguments as described in Passing Arguments, you will want to construct GraphQL queries using variables in client code. 
  - You can do this by including a keyword prefixed with a dollar sign in the query, and passing an extra variables field on the payload.


*****************************

  1. app.js
  2. public/index.html


*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
const { ruruHTML } = require('ruru/server')
app.use(express.static('./public'))

// 1. change the query
const schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)

const root = {
  rollDice(args) {
    let output = []
    for (let i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)))
    }
    return output
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
