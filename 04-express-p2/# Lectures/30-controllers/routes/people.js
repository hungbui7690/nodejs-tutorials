const express = require('express')
const router = express.Router()

const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require('../controllers/people') // (4)

let { people } = require('../data')

router.get('/', getPeople) // (5)
router.post('/', createPerson)
router.post('/postman', createPersonPostman)
router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)

module.exports = router
