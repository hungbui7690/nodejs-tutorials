/*
  Setting Custom Headers for Individual Requests

  # Method 2: Dynamic headers
    - Some time you need to headers to be dynamically applied at runtime.  For these use cases axios allows you to dynamically header just before making a request


*/

const express = require('express')
const app = express()
const axios = require('axios')
const port = 5000

// 1. If the auth token changes frequently and is dependent on which user is sending the data to the server. Auth token has to be retrieved from a third party API or some thing like that
function getToken() {
  // This function retrieves the current user's token from somewhere Dynamically
  return 'DYNAMIC_ACCESS_TOKEN'
}

// 2.
axios
  .get('https://jsonplaceholder.typicode.com/todos/1', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error:', error))

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
