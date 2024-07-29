/*
  - res.status(201).json({ success: true, data: [...people, name] }) 
    > we add "name" into data
    > we don't need ID, because when we work with DB, ID will will be auto generated 

  > postman: localhost:5000/api/postman/people 

*/

const express = require('express')
const app = express()

let { people } = require('./data')

app.use(express.static('./methods-public'))

app.use(express.json()) // ***

// (1) client will go here to get the data (people) to display on UI
app.get('/api/people', (req, res) => {
  res.status(200).send({ success: true, data: people })
})

// (2)
app.post('/login', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (name) return res.status(200).send(`Welcome ${name}`)

  return res.status(404).send('Please provide credentials')
})

// (3) when submit the form, it will go here
app.post('/api/people', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  res.status(201).json({ success: true, person: name })
})

// (1) postman >> pic: postman
app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })

  res.status(201).json({ success: true, data: [...people, name] })
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
