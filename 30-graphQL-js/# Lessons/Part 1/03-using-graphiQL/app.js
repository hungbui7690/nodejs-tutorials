/*
  Using GraphiQL
  - GraphiQL is GraphQL’s IDE -> a great way of querying and exploring your GraphQL API. 
  - One easy way to add it to your server is via the MIT-licensed <ruru> package which bundles a prebuilt GraphiQL with some popular enhancements. 
  - To do so, install the <ruru> module with <npm install --save ruru> and then add the following to your <server.js> file, then restart the <node server.js> command


******************************

  1. setup ruruHTML
  2. browser -> http://localhost:5000/ruru -> pic


*/

const express = require('express')
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
var { ruruHTML } = require('ruru/server') // 1.

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello() {
    return 'Hello world!'
  },
}

const app = express()

// 2. Serve the GraphiQL IDE.
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
