/*
  User Model
  1. models/User.js
    - email: using match() with regex to validate for email
      -> unique: create unique index -> unique is not a validator -> similar to ID

  - pic: email-validator
  
*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDb = require('./db/connect')

// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    // ===== Connect DB
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
