const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { attachCookiesToResponse } = require('../utils')

const register = async (req, res) => {
  const { email, name, password } = req.body
  const isEmailExists = await User.findOne({ email })
  if (isEmailExists)
    throw new CustomError.BadRequestError('Email already exists')

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ name, email, password, role })
  const tokenUser = { name: user.name, userID: user._id, role: user.role }
  attachCookiesToResponse({ res, user: tokenUser })

  return res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    throw new CustomError.BadRequestError('Please provide email and password')

  const user = await User.findOne({ email })
  if (!user) throw new CustomError.UnauthenticatedError('Invalid Credentials')

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect)
    throw new CustomError.UnauthenticatedError('Invalid Credentials')

  const tokenUser = {
    name: user.name,
    userID: user._id,
    role: user.role,
  }
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

// LOGOUT
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000),
  })

  res.status(StatusCodes.OK).send({ msg: 'user logged out !' })
}

module.exports = {
  register,
  login,
  logout,
}
