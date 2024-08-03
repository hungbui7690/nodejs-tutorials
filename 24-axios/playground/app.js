/*
  Handling CORS error in development and Production
  - CORS means Cross Origin Resource Sharing. This is a security feature that is implement by all major browsers in order to stop malicious website from accessing data from another domain without their permission

  # What is CORS error?
    + CORS issues arises when you have an app that is running in the browser and making requests to a server that is on another domain

    + The browsers stops such requests unless the server indicates with headers that is willing to accept these requests (That is the server is willing to accept requests from the clients origin)

  # Handling CORS in development
    + During development it is common to encounter CORS error, this is because the client and server both are running om different ports or domains

*****************************

  - Here are some of the methods you can use to mitigate this error with the help of axios

  Step 1 Using a Middleware proxy
  - you can use a middleware proxy to proxy requests to the server. this involves configuring the development server to that are aimed at a aimed at a specific path/paths to the backend server and other requests to the server running on the local machine

    "proxy": "http://localhost:3000",


  Step 2 CORS Middleware in Backend
  - In backend frameworks such as express js there is a dedicated middleware to enable the CORS functionality


*******************************

  Introducing Axios Interceptors for enhanced control
  - Interceptors allows you to intercept and manipulate a HTTP request and response before they are handled by catch or then

  - This capability can be used in a variety of use cases most notably

  # Setting headers dynamically
  - Logging requests to console before they are being made
  - transforming data before it reaches other parts of your app
  - handling error and
  - other such tasks

  - There are two kinds of interceptors

  1. Request Interceptors
  - Request interceptors are used to modify a request before it is being made. Using request interceptors you can modify the request configuration object and manipulate configuration such as header URL or parameters

  - You can also set global headers or perform logging with the help of request interceptors

  - Request Interceptors are called just before a HTTP request is being made by the server.

  2. Response Interceptors
  - As the name suggests the response interceptors are invoked just after a response is received by the server but before the promise is resolved.

  - Response interceptors can be used to globally transform the data, manage application wide errors, handle tasks such as error handling and analytics based response


*******************************

  Practical Use Case for Axios Interceptors
  - Authentication: Automatically attach auth tokens to outgoing requests
  - Logging: Logging a request to console just before it is being made
  - Error Handling: Implement error handling on a application wide basis
  - Data Transformation: Process the data in the required format before sending.
  - Loading Headers: Show a indication when a request is starting and hide it when the request is complete


*/

const express = require('express')
const app = express()
const axios = require('axios')
const port = 5000

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
