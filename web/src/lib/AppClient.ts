import axios, { AxiosInstance } from 'axios'

import { apiUrl } from './config'

export class AppClient {
  baseUrl: string

  client: AxiosInstance

  constructor() {
    this.baseUrl = apiUrl
    this.client = axios.create({ baseURL: this.baseUrl })

    this.setupClient()
  }

  setupClient() {
    this.client.interceptors.response.use(
      response => response,
      error => {
        throw error
      }
    )
  }

  async getTrips(
    params: {
      keyword?: string
      cursor?: number
      limit?: number
    } = {}
  ) {
    const response = await this.client.get('/trips', { params })
    return response.data
  }
}
