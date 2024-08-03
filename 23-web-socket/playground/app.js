/*
  Sending chat message to all the connected clients

*/

const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const app = express()
const PORT = process.env.PORT || 5000

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(express.static('./public'))

// 1. Array to store all the connected clients
const clients = []

wss.on('connection', function connection(ws) {
  console.log('WS connection arrived')

  // 2. add a client to the array whenever a new client is connected
  clients.push(ws)

  // 3. Broadcast the message to all the connected clients
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString())
      }
    })
  })

  // 4. when the connection closes remove the client from the clients Array
  ws.on('close', () => {
    // Remove the client from the array when it disconnects
    const index = clients.indexOf(ws)
    if (index > -1) {
      clients.splice(index, 1)
    }
  })

  ws.send('Welcome to the chat!')
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
