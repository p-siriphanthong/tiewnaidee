const axios = require('axios')
const { setupCache } = require('axios-cache-adapter')

const defaultCacheConfig = {
  maxAge: 15 * 60 * 1000,
}

function apiAdapter(baseURL, cacheConfig = defaultCacheConfig) {
  const cache = setupCache(cacheConfig)

  return axios.create({
    baseURL,
    adapter: cache.adapter,
  })
}

module.exports = apiAdapter
