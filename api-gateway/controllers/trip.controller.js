const { jsonServerUrl } = require('../config')
const apiAdapter = require('../apiAdapter')
const searchKeyword = require('../helpers/searchKeyword')
const infiniteScroll = require('../helpers/infiniteScroll')
const Trip = require('../models/trip.model')

const jsonServer = apiAdapter(jsonServerUrl)

module.exports = {
  getTrips: async (req, res) => {
    const allTrips = await jsonServer
      .get('/trips')
      .then(response => response.data.map(data => new Trip(data)))

    const { keyword = '', cursor = null, limit = 10 } = req.query
    const filteredTrips = searchKeyword(keyword, allTrips, {
      keys: ['title', 'description', 'tags'],
    })
    const result = infiniteScroll(filteredTrips, 'eid', {
      cursor,
      limit: +limit,
    })

    res.send(result)
  },
}
