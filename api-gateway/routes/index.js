const express = require('express')
const router = express.Router()

router.use('/trips', require('./trip.routes'))

module.exports = router
