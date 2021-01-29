import * as mockData from './trips.fixture'

export class AppClient {
  async getTrips({ keyword, cursor, limit }) {
    let response = null

    switch ([keyword, cursor, limit].toString()) {
      case ['', undefined, 5].toString():
        response = mockData.tripsWithoutKeyword
        break
      case ['', 5, 5].toString():
        response = mockData.tripsWithoutKeywordLoadMore
        break
      case ['ภูเขา', undefined, 5].toString():
        response = mockData.tripsWithKeyword
        break
      case ['not found', undefined, 5].toString():
        response = mockData.notFoundTrips
        break
      default:
        console.error(
          `Unhandled query params: { keyword: '${keyword}', cursor: ${cursor}, limit: ${limit} }`
        )
    }

    return new Promise(resolve => {
      setTimeout(() => resolve(response))
    }, 1000)
  }
}
