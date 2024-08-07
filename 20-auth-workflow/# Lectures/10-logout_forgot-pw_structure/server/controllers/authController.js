const User = require('../models/User')
const Token = require('../models/Token')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
} = require('../utils')
const crypto = require('crypto')

const register = async (req, res) => {
  const { email, name, password } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists')
  }
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'
  const verificationToken = crypto.randomBytes(40).toString('hex')

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  })

  const origin = 'http://localhost:3000'

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  })

  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  if (!user.isVerified)
    throw new CustomError.UnauthenticatedError('Please verify your account ')

  const tokenUser = createTokenUser(user)

  let refreshToken = ''

  const existToken = await Token.findOne({ user: user._id })

  if (existToken) {
    const { isValid } = existToken
    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    refreshToken = existToken.refreshToken

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser })
    return
  }

  refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body

  const user = await User.findOne({ email })
  console.log(user)

  if (!user) throw new CustomError.UnauthenticatedError('Verification Failed')

  if (user.verificationToken !== verificationToken)
    throw new CustomError.UnauthenticatedError('Verification Failed')

  user.isVerified = true
  user.verified = Date.now()
  user.verificationToken = ''
  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'Email verified' })
}

// (3)
const logout = async (req, res) => {
  // (a)
  await Token.findOneAndDelete({ user: req.user.userId })

  // (b)
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

// (5) sang authRoutes
const forgotPassword = async (req, res) => {
  res.send('forgot password')
}
const resetPassword = async (req, res) => {
  res.send('reset password')
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
}
