/*
  Object Types
  - In many cases, you don’t want to return a number or a string from an API. You want to return an object that has its own complex behavior. GraphQL is a perfect fit for this.
  - In GraphQL schema language, the way you define a new object type is the same way we have been defining the Query type in our examples. Each object can have fields that return a particular type, and methods that take arguments. 
  
  
**********************

  Ruru

    {
      getDie(numSides: 6) {
        rollOnce
        roll(numRolls: 3)
      }
    }


**********************

  - This way of defining object types often provides advantages over a traditional REST API. Instead of doing one API request to get basic information about an object, and then multiple subsequent API requests to find out more information about that object, you can get all of that information in one API request. That saves bandwidth, makes your app run faster, and simplifies your client-side logic.


*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
const { ruruHTML } = require('ruru/server')
app.use(express.static('./public'))

// 1.
var schema = buildSchema(/* GraphQL */ `
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`)

// 2a. Instead of a root-level resolver for the RandomDie type, we can instead use an ES6 class, where the resolvers are instance methods. This code shows how the RandomDie schema above can be implemented:
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides)
  }

  roll({ numRolls }) {
    var output = []
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce())
    }
    return output
  }
}

// 2b.
var root = {
  getDie({ numSides }) {
    return new RandomDie(numSides || 6)
  },
}

var root = {
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
