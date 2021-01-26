function infiniteScroll(
  data,
  key,
  {
    cursor = null,
    limit = 10,
    comparator = (value, cursor) => value === cursor,
  } = {}
) {
  const startIndex = Math.max(
    data.findIndex(value => comparator(value[key], cursor)),
    0
  )
  const nextData = data[startIndex + limit]

  return {
    data: data.slice(startIndex, startIndex + limit),
    meta: {
      limit,
      cursor,
      nextCursor: nextData ? nextData[key] : null,
    },
  }
}

module.exports = infiniteScroll
