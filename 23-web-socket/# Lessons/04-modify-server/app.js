/*
  Setup Websocket
  - We want the server to take the messages from a single client and send it back again to the sender client.
  - Let us edit the server code to add that functionality.

  - What are we doing here
    1. we have edited the express code to send files from the public directory. We are going to build the front-end of our chat app and send the html and js files for the front end from the public directory
    2. In the websocket we are sending the message that we are receiving back to the client
    3. We can also broadcast the message to all the client connected to the websocket server. We are going to do this later on in the article as a bonus content


  *** After make these changes -> we cannot test by postman anymore

*/

const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('./public'))

// 1. Create HTTP server by passing the Express app
const server = http.createServer(app)

// 2. Integrate WebSocket with the HTTP server
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  console.log('WS connection arrived')

  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
    // Echo the message back to the client
    ws.send(`Echo: ${message}`)
  })

  // Send a welcome message on new connection
  ws.send('Welcome to the chat!')
})

// 3. Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
