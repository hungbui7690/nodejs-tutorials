const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orderController')

router
  .route('/')
  .post(createOrder)
  .get(authenticateUser, authorizePermissions('admin'), getAllOrders)

// must place this route before /:id
router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders)

router
  .route('/:id')
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder)

// (2) app.js
module.exports = router
