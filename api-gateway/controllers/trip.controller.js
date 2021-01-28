const { jsonServerUrl } = require('../config')
const apiAdapter = require('../apiAdapter')
const Trip = require('../models/trip.model')

const jsonServer = apiAdapter(jsonServerUrl)

module.exports = {
  getTrips: async (req, res, next) => {
    const keyword = req.query.keyword || ''
    const cursor = +req.query.cursor || 0
    const limit = +req.query.limit || 10

    // "attr" param is not available in json-server for now
    // waiting for merge pull request https://github.com/typicode/json-server/pull/558
    const url = `/trips?q=${keyword}&attr=title,description,tags&_start=${cursor}&_limit=${limit}`
    const response = await jsonServer.get(encodeURI(url)).catch(next)

    const totalCount = +response.headers['x-total-count']
    const data = response.data.map(data => new Trip(data))
    const meta = {
      totalCount,
      limit,
      cursor,
      nextCursor: cursor + limit < totalCount ? cursor + limit : null,
    }

    res.send({ data, meta })
  },
}
