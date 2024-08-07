/*
  Mutations and Input Types
  - You don’t need anything more than this to implement mutations. But in many cases, you will find a number of different mutations that all accept the same input parameters. A common example is that creating an object in a database and updating an object in a database often take the same parameters. To make your schema simpler, you can use “input types” for this, by using the input keyword instead of the type keyword.

  - For example, instead of a single message of the day, let’s say we have many messages, indexed in a database by the id field, and each message has both a content string and an author string. We want a mutation API both for creating a new message and for updating an old message. We could use the schema:


**************************

  - To call a mutation, you must use the keyword mutation before your GraphQL query. To pass an input type, provide the data written as if it’s a JSON object. For example, with the server defined above, you can create a new message and return the id of the new message with this operation:

      mutation {
        createMessage(input: {
          author: "andy",
          content: "hope is a good thing",
        }) {
          id
        }
      }
*/

const express = require('express')
const app = express()
const { createHandler } = require('graphql-http/lib/use/express')
const { buildSchema } = require('graphql')
const { ruruHTML } = require('ruru/server')
app.use(express.static('./public'))

// 1. For example, instead of a single message of the day, let’s say we have many messages, indexed in a database by the id field, and each message has both a content string and an author string. We want a mutation API both for creating a new message and for updating an old message. We could use the schema:
var schema = buildSchema(/* GraphQL */ `
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`)
/*
  - Here, the mutations return a Message type, so that the client can get more information about the newly-modified Message in the same request as the request that mutates it.
  - Input types can’t have fields that are other objects, only basic scalar types, list types, and other input types.
  - Naming input types with Input on the end is a useful convention, because you will often want both an input type and an output type that are slightly different for a single conceptual object.
*/

// 2. If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, { content, author }) {
    this.id = id
    this.content = content
    this.author = author
  }
}

// 3. Maps username to content -> index.html
var fakeDatabase = {}

var root = {
  getMessage({ id }) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id)
    }
    return new Message(id, fakeDatabase[id])
  },
  createMessage({ input }) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex')

    fakeDatabase[id] = input
    return new Message(id, input)
  },
  updateMessage({ id, input }) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id)
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input
    return new Message(id, input)
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
