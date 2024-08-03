/*
  Modifying content type  with axios
  - With the Content-Type header we can inform the server, what type of data are we sending.
  - Is it JSON data or plain text or any other type and as such this is an important header.
  - When you are changing the data type that is being sent to the server you need to modify the Content-Type header.


*/

const express = require('express')
const app = express()
const axios = require('axios')
const port = 5000

// We are explicitly setting Content-Type for the post request to application/json
axios
  .post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      title: 'XYZ',
      body: 'lorem15',
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error:', error))

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
