/*
  Advanced Header configuration with Axios
  - Using Advanced header configuration allows us to control the HTTP requests headers, and enables us to customize headers for specific situations like authentication, content management and many more

*************************

  Set default headers globally for all Axios requests
  - Using Axios you can set a global setting that would allow us to send the same headers for all the requests that are made.
  - This is helpful in automation of headers that are common across all the requests that are made, an example would be Content-Type or auth tokens

*/

const express = require('express')
const app = express()
const port = 5000

// Step 1: Creating an axios instance
// You can create an instance of axios to configure the global settings. Then use the instance across your application in order to send requests.
const axios = require('axios')

// creating an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

// Setting the default headers
axiosInstance.defaults.headers.common[
  'Authorization'
] = `Bearer YOUR_ACCESS_TOKEN`
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'

// Step 2: Using the instance
// Here is how you can use the instance that we just created to send requests with pre set defaults
axiosInstance
  .get('/todos/1')
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error:', error))

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
