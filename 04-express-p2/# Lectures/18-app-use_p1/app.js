/*
  - now everything is ok, but function should be placed into a separate file 
    > just need to create 1 module for these function

  - and now, we just have 2 routes that we want to add middleware into
    > but assume that we have multiple routes 
      >> there is a method that helps us add middleware into multiple routes at the same time 
      >> app.use()
  
  - app.use() will help all the one "after" that can use logger() 
    > in our app, / won't have logger()

  (1) logger.js

*/

const express = require('express')
const app = express()
const logger = require('./logger') // (3)

app.get('/', (req, res) => {
  res.send('Home') // *** this on DOES NOT have middleware, because it places above app.use(logger)
})

app.use(logger) // (4) the ones after this line will go through logger()

app.get('/about', (req, res) => {
  res.send('About')
})

app.get('/api/products', (req, res) => {
  res.send('Products')
})

app.get('/api/items', (req, res) => {
  res.send('Items')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
