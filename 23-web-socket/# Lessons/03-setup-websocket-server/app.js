/*
  Setup Websocket
  - after done the following code 
    -> Postman 
      + new -> websocket request -> ws://localhost:8181
      + new -> http request      -> http://localhost:5000

    -> click on Connect button to connect to websocket server
    -> type message -> Click Send


*/

const express = require('express')
const app = express()
const WebSocket = require('ws') // 1.

/*
  2. We are creating a new websocket server here and running it on port 8181
  -> This server is running independently of the HTTP express js server which means that it does not share the same port or connection as the HTTP server
*/
const wss = new WebSocket.Server({ port: 8181 })

/*
  3. We are handling the websocket connections -> here we are listening for new websocket connections. When a client connects to the server via websockets the callback method is triggered
  -> the ws parameter here represents the connected websocket client.
*/
wss.on('connection', function connection(ws) {
  /*
  4. Then inside the callback function we are setting up another listener that listens to any messages that the client is sending to the server. Whenever a message is received we are logging that message to the console for now. Later we can send this message back to the client or do whatever we want to do with the message
  */
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
  })

  // 5. Lastly, we are sending a sample message back to the client.
  ws.send('This is a message')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
