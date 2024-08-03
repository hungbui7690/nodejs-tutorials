/*
  Practical code examples: Auth Tokens and Content Type Modifications
  
  # Automatically adding auth tokens with axios
    - for requests that require auth token with every request, we can use something called as interceptors.
    - Basically we are using an interceptor to attach a auth token every time a request is being made that's it

*/

const express = require('express')
const app = express()
const axios = require('axios')
const port = 5000

// creating the Axios instance
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos/1',
})

// retrieve the auth token from somewhere
function getAuthToken() {
  // Retrieve and return the auth token from third party api or some other place etc.
  return 'your_auth_token_here'
}

// A request interceptor to include the auth token in every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Now, when you are sending data apiClient, each request will automatically have the auth token
apiClient
  .get('/user')
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error:', error))

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
