/*
  Setting Custom Headers for Individual Requests
  - Default header are useful for application wide sending of request but you might also need to send specific headers with individual requests.
  - You can set custom headers for individual request in axios as well. Here are 2 ways you can do that


*/

const express = require('express')
const app = express()
const axios = require('axios')
const port = 5000

// Method 1:  Setting custom headers in a request
// By using the headers property. You can directly specify the custom headers in your configuration Object like so
axios
  .get('https://jsonplaceholder.typicode.com/todos/1', {
    headers: {
      'X-Custom-Header': 'xyz',
      Authorization: 'Bearer ANOTHER_ACCESS_TOKEN', // Overrides any defaults that are set
    },
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error:', error))

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
