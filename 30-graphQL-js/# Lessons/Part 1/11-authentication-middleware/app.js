/*
  Authentication & Middleware
  - It’s simple to use any Express middleware in conjunction with graphql-http. In particular, this is a great pattern for handling authentication.
  - To use middleware with a GraphQL resolver, just use the middleware like you would with a normal Express app. The request object is then available as the second argument in any resolver.


*****************************

  - For example, let’s say we wanted our server to log the IP address of every request, and we also want to write an API that returns the IP address of the caller. We can do the former with middleware, and the latter by accessing the request object in a resolver. Here’s server code that implements this


*****************************

- In a REST API, authentication is often handled with a header, that contains an auth token which proves what user is making this request. Express middleware processes these headers and puts authentication data on the Express request object. Some middleware modules that handle authentication like this are Passport, express-jwt, and express-session. Each of these modules works with graphql-http.
- If you aren’t familiar with any of these authentication mechanisms, we recommend using express-jwt because it’s simple without sacrificing any future flexibility.
- If you’ve read through the docs linearly to get to this point, congratulations! You now know everything you need to build a practical GraphQL API server.


*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
const { ruruHTML } = require('ruru/server')
app.use(express.static('./public'))

// 1.
var schema = buildSchema(`
  type Query {
    ip: String
  }
`)

// 3.
function loggingMiddleware(req, res, next) {
  console.log('ip:', req.ip)
  next()
}

// 2.
var root = {
  ip(args, context) {
    return context.ip
  },
}

app.get('/ruru', (_req, res) => {
  res.type('html')
  res.end(ruruHTML({ endpoint: '/graphql' }))
})

// 4.
app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
    context: (req) => ({
      ip: req.raw.ip,
    }),
  })
)

app.listen(5000)
console.log('Running a GraphQL API server at http://localhost:5000/graphql')
