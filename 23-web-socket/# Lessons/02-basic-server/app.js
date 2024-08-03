/*
  Creating the backend
  1. npm init
  
  2. npm install express
    npm install ws

  3. package.json -> nodemon app.js



*/

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
