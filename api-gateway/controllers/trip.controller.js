const jsonServer = require('../services/json-server')
const Trip = require('../models/trip.model')

module.exports = {
  getTrips: async (req, res, next) => {
    const keyword = req.query.keyword || ''
    const cursor = +req.query.cursor || 0
    const limit = +req.query.limit || 10

    const response = await jsonServer
      .getTripList({ keyword, cursor, limit })
      .catch(next)

    const totalCount = +response.headers['x-total-count']
    const data = response.data.map(data => new Trip(data))
    const meta = {
      totalCount,
      keyword,
      limit,
      cursor,
      nextCursor: cursor + limit < totalCount ? cursor + limit : null,
    }

    res.send({ data, meta })
  },
}
