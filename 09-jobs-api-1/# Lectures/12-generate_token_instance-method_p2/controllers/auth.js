const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })

  const token = user.createJWT() // use instance method here
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  res.send('Login User')
}

module.exports = {
  register,
  login,
}
