/*
  Passing Arguments
  - Just like a REST API, it’s common to pass arguments to an endpoint in a GraphQL API. By defining the arguments in the schema language, typechecking happens automatically. Each argument must be named and have a type. For example, in the Basic Types documentation we had an endpoint called rollThreeDice:

    type Query {
      rollThreeDice: [Int]
    }


*****************************

  Server
  - Instead of hardcoding “three”, we might want a more general function that rolls numDice dice, each of which have numSides sides. We can add arguments to the GraphQL schema language like this:

    type Query {
      rollDice(numDice: Int!, numSides: Int): [Int]
    }

  
*****************************

  Postman / Ruru
  - When you call this API, you have to pass each argument by name. So for the server above, you could issue this GraphQL query to roll three six-sided dice:

    {
      rollDice(numDice: 3, numSides: 6)
    }


*****************************

  public/index.html
  - we also can use fetch in index.html


*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
const { ruruHTML } = require('ruru/server')
app.use(express.static('./public'))

// 1. The exclamation point in Int! indicates that numDice can’t be null, which means we can skip a bit of validation logic to make our server code simpler. We can let numSides be null and assume that by default a die has 6 sides.
var schema = buildSchema(`
    type Query {
      rollDice(numDice: Int!, numSides: Int): [Int]
    }
`)

// 2. So far, our resolver functions took no arguments. When a resolver takes arguments, they are passed as one “args” object, as the first argument to the function. So rollDice could be implemented as:
var root = {
  // a. rollDice(args) {}

  // b. It’s convenient to use ES6 destructuring assignment for these parameters, since you know what format they will be. So we can also write rollDice as
  rollDice({ numDice, numSides }) {
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
