const express = require('express')
const tripController = require('../controllers/trip.controller')

const router = express.Router()

router.get('/', tripController.getTrips)

module.exports = router
