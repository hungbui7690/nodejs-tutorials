/*
  GraphQL Clients
  - Since a GraphQL API has more underlying structure than a REST API, there are more powerful clients like Relay which can automatically handle batching, caching, and other features. But you don’t need a complex client to call a GraphQL server. With graphql-http, you can just send an HTTP POST request to the endpoint you mounted your GraphQL server on, passing the GraphQL query as the query field in a JSON payload.


******************************

  - For example, let’s say we mounted a GraphQL server on http://localhost:4000/graphql as in the example code for running an Express GraphQL server, and we want to send the GraphQL query { hello }. We can do this from the command line with curl. If you paste this into a terminal:

      curl -X POST \
      -H "Content-Type: application/json" \
      -d '{"query": "{ hello }"}' \
      -> http://localhost:4000/graphql

  - You should see the output returned as JSON:

      {"data":{"hello":"Hello world!"}}

  - If you prefer to use a graphical user interface to send a test query, you can use clients such as <GraphiQL>, <Insomnia>, and <Postman> -> or we can use <Relay>


******************************

  1. setup public folder -> index.html


*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
var { ruruHTML } = require('ruru/server')

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

app.use(express.static('./public')) // ***

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
