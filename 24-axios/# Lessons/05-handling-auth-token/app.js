/*
  Practical code examples: Auth Tokens and Content Type Modifications
  - Let us look at some practical and real life examples of setting custom headers with axios these include handling auth tokens and content type modifications


  # Handling auth tokens
    - the most commonly used auth tokens are JWT (that is JSON web tokens), these are generally send in the Authorization header.


*/

const express = require('express')
const app = express()
const axios = require('axios')
const port = 5000

// Function to make a request with an auth token
function fetchUserData(authToken) {
  axios
    .get('https://jsonplaceholder.typicode.com/todos/1', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error('Error:', error))
}

// Example usage
const userToken = 'your_user_token_here'
// In this example we are demonstrating how to set a auth token header in a single request in server side with axios, node and express
fetchUserData(userToken)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
