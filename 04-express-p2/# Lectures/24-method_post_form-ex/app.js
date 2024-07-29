/*  
  POST    Insert Data     store.com/api/orders          place an order (send data)


  - check index.html in methods-public/ 
    > we can see the form has "action"=/login 
    > /login is the path that we will submit the form to


  - right, now we don't have the route to handle /login 

  + though we don't have /login route
    > we still can submit 
    > then go to network tab >> we can see method = POST
  + network tab > payload > we will see key:value pair that we just submitted
  + as we learn in prev lesson >> body is optional
    > in GET method, we don't need body
    > in POST method, BODY IS IMPORTANT
      >> in the form, there is attribute "name" >> this is the key (in key:value)

  + to get the data that user type at the form: 
    1. use mdw
      >> app.use(express.urlencoded({ extended: false })) 
          - urlEncoded: This is a built-in middleware function in Express. 
            > It parses incoming requests with urlencoded payloads and is based on body-parser.
          - extended: This option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true)
    
    2. req.body: when user submits form, server can take out that data
      >> if we check network tab > Headers > Request Headers 
          > Content-Type is application/x-www-form-URLENCODED

/////////////////////////////////////////////

  (1) /methods-public/index.html:
      > must have action="/login" + input MUST HAVE "name" attribute
      > this will be req.body 

  (2) app.use(express.urlencoded({ extended: false }))
      > must have this line to parse data from Front End
      > if we don't have urlencoded >> then req.body will return "undefined"


  TEST: 
  - localhost:5000/ 
    > must submit the form to run /login 
    > if we go to /login at the beginning 
      >> it won't work because /login now is GET method (we don't have this in our server)
      >> the method that we handle is POST method


  *** form + POST method
    - action="/login"
    - attribute "name"
    - app.use(express.urlencoded({ extended: false }))
*/

const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false })) // (2) parse form data > MUST HAVE > otherwise, req.body='undefined'

app.get('/api/people', (req, res) => {
  res.status(200).send({ success: true, data: people })
})

// (3)
app.post('/login', (req, res) => {
  console.log(req.body) // (a)

  const { name } = req.body // (b)

  if (name) return res.status(200).send(`Welcome ${name}`) // (c)

  return res.status(404).send('Please provide credentials') // (d)
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
