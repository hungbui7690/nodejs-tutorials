/*
  Global configuration for Content-Type
  - you can also set the content type globally to set the header for all requests.


*/

const express = require('express')
const app = express()
const axios = require('axios')
const port = 5000

// Creating the Axios instance with a default Content-Type -> all requests have these info
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Use apiClient for making requests
apiClient
  .post('/posts/1', {
    title: 'XYZ',
    body: 'lorem15',
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error:', error))

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
