import axios, { AxiosInstance } from 'axios'

import { apiUrl } from './config'

export class AppClient {
  baseURL: string

  client: AxiosInstance

  constructor() {
    this.baseURL = apiUrl
    this.client = axios.create({ baseURL: this.baseURL })

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
      cursor?: string
      limit?: number
    } = {}
  ) {
    const response = await this.client.get('/trips', { params })
    return response.data
  }
}
