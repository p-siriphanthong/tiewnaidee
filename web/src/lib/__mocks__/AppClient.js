import * as mockData from './trips.fixture'

export class AppClient {
  async getTrips({ keyword, cursor, limit }) {
    this.response = null

    switch ([keyword, cursor, limit].toString()) {
      case ['', undefined, 5].toString():
        this.response = mockData.tripsWithoutKeyword
        break
      case ['', 5, 5].toString():
        this.response = mockData.tripsWithoutKeywordLoadMore
        break
      case ['ภูเขา', undefined, 5].toString():
        this.response = mockData.tripsWithKeyword
        break
      case ['not found', undefined, 5].toString():
        this.response = mockData.notFoundTrips
        break
      default:
        // eslint-disable-next-line no-console
        console.error(
          `Unhandled query params: { keyword: '${keyword}', cursor: ${cursor}, limit: ${limit} }`
        )
    }

    return new Promise(resolve => {
      setTimeout(() => resolve(this.response))
    }, 1000)
  }
}
