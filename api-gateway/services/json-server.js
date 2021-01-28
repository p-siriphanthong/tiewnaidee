const apiAdapter = require('../apiAdapter')
const { jsonServerUrl } = require('../config')

const jsonServer = apiAdapter(jsonServerUrl)

module.exports = {
  getTripList: ({ keyword = '', cursor = 0, limit = 10 } = {}) => {
    // "attr" param is not available in json-server for now
    // waiting for merge pull request https://github.com/typicode/json-server/pull/558
    const url = `/trips?q=${keyword}&attr=title,description,tags&_start=${cursor}&_limit=${limit}`

    return jsonServer.get(encodeURI(url))
  },
}
