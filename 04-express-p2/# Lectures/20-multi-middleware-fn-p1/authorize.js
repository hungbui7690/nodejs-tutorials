// (1)
const authorize = (req, res, next) => {
  const { user } = req.query
  if (user === 'john') {
    req.user = { name: 'john', id: 3 }
    next()
  } else {
    return res.status(401).send('Unauthorized')
  }
}

// (2) sang app.js
module.exports = authorize
