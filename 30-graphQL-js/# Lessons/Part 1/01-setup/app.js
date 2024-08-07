/*
  Installation
    ~~ npm init
    ~~ npm install graphql --save
    ~~ npm install express graphql-http --save
    ~~ npm install nodemon


******************************

  1. create server.js or app.js
    - To handle GraphQL queries, we need a schema that defines the <Query> type, and we need an API root with a function called a “resolver” for each API endpoint. For an API that just returns “Hello world!”, we can put this code in a file named <server.js>


******************************

  2. run 
  ~~ node server.js



*/

// ./server.js
const { graphql, buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  hello() {
    return 'Hello world!'
  },
}

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: '{ hello }',
  rootValue,
}).then((response) => {
  console.log(response)
})
