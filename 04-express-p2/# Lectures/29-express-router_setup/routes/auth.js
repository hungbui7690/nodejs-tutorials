const express = require('express') // (1)
const router = express.Router() // (2)

// (3) instead of using app.post() >> we will use router.post() >> path must be "/", NOT "/login"
router.post('/', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (name) return res.status(200).send(`Welcome ${name}`)

  return res.status(404).send('Please provide credentials')
})

module.exports = router // (4) to /routes/people.js
