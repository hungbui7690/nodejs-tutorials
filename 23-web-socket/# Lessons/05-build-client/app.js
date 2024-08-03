/*
  Build Client
  - in public/ -> create 2 files:
    -> index.html
    -> script.js

  - Implement websocket on the client side
    -> script.js

  - http://localhost:5000 -> test


*/

const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static('./public'))

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  console.log('WS connection arrived')

  ws.on('message', function incoming(message) {
    console.log('received: %s', message)

    ws.send(`Echo: ${message}`)
  })

  ws.send('Welcome to the chat!')
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
