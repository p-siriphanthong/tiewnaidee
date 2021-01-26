function checkTextContains(value, text) {
  if (typeof value === 'string')
    return value.toLowerCase().includes(text.toLowerCase())
  if (Array.isArray(value))
    return value.some(val => checkTextContains(val, text))
  return false
}

function searchKeyword(keyword = '', data = [], config = {}) {
  const { keys = Object.keys(data[0] || {}) } = config
  const texts = keyword.split(/\s+/g)

  return data.filter(value =>
    texts.some(text => keys.some(key => checkTextContains(value[key], text)))
  )
}

module.exports = searchKeyword
