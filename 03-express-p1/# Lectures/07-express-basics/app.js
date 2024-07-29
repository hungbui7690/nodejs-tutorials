/*

  (1) npm install express --save
      > npm i express@4.17.1 --save 
        > install specific version

  - HTTP Verbs
      app.get
      app.post
      app.put
      app.delete
      app.all >> work with all above
      app.use
      app.listen(5000, ()=> {}) >> giống server.listen() trong HTTP

  - res.send(string or html) 
  - res.all(*) 
    > handle 404 
    > use .all() because user not only use GET req, but also use others diff actions that we don't want to cover 
      >> so, all the actions, routes that we have not setup will jump into .all()
      
  - res.status(200).send(): always go with status code to control

*/

const express = require('express') // (1)

const app = express() // (2)

// (4)
app.get('/', (req, res) => {
  console.log(`user hit the resource`)
  res.status(200).send('Homepage')
})

// (5)
app.get('/about', (req, res) => {
  res.status(200).send('About Page')
})

// (6) error route handle
app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>')
})

// (3)
app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
