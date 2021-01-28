const mockTrips = require('./trips.fixture')

function isContains(text, keyword) {
  return text.toLowerCase().includes(keyword.toLowerCase())
}

module.exports = {
  getTripList: ({ keyword = '', cursor = 0, limit = 10 } = {}) => {
    const trips = mockTrips.filter(
      trip =>
        isContains(trip.title, keyword) ||
        isContains(trip.description, keyword) ||
        trip.tags.some(tag => isContains(tag, keyword))
    )

    return Promise.resolve({
      headers: { 'x-total-count': trips.length },
      data: trips.slice(cursor, cursor + limit),
    })
  },
}
