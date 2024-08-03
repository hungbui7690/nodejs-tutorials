/*
  Setup
  - npm install express
  - npm install nodemon
  @@ npm install axios


*/

const express = require('express')
const axios = require('axios')
const app = express()
const port = 5000

app.get('/fetch-data', (req, res) => {
  axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      res.send('Error occurred when fetching data')
      console.error('An error occurred when fetching data', error)
    })
})

app.post('/create-post', (req, res) => {
  axios
    .post('https://jsonplaceholder.typicode.com/posts', {
      title: 'Hello World',
      body: 'This is a new post created by my server.',
      userId: 1,
    })
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      res.send('Error creating a post')
      console.error('There was an error!', error)
    })
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
