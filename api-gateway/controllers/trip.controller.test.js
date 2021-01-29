const request = require('supertest')
const { app, server } = require('../server')

jest.mock('../services/json-server')

afterAll(() => {
  server.close()
})

describe('Trip Controller', () => {
  describe('Trip List API', () => {
    const route = '/api/trips'

    it('should get all trips successfully', async () => {
      const response = await request(app).get(route).expect(200)
      const { data, meta } = response.body

      expect(data).toHaveLength(10)
      expect(meta).toEqual({
        totalCount: 10,
        keyword: '',
        limit: 10,
        cursor: 0,
        nextCursor: null,
      })
    })

    it('should get trips by keyword successfully', async () => {
      const response = await request(app)
        .get(route)
        .query({ keyword: 'ภูเขา' })
        .expect(200)
      const { data, meta } = response.body

      expect(data).toHaveLength(3)
      expect(meta).toEqual({
        totalCount: 3,
        keyword: 'ภูเขา',
        limit: 10,
        cursor: 0,
        nextCursor: null,
      })
    })

    it('should get trips by custom limit size successfully', async () => {
      const response = await request(app)
        .get(route)
        .query({ limit: 5 })
        .expect(200)
      const { data, meta } = response.body

      expect(data).toHaveLength(5)
      expect(meta).toEqual({
        totalCount: 10,
        keyword: '',
        limit: 5,
        cursor: 0,
        nextCursor: 5,
      })
    })

    it('should load more trips by cursor successfully', async () => {
      const response_1 = await request(app)
        .get(route)
        .query({ limit: 4 })
        .expect(200)
      const { data: data_1, meta: meta_1 } = response_1.body

      expect(data_1).toHaveLength(4)
      expect(meta_1).toEqual({
        totalCount: 10,
        keyword: '',
        limit: 4,
        cursor: 0,
        nextCursor: 4,
      })

      const response_2 = await request(app)
        .get(route)
        .query({ limit: 4, cursor: 4 })
        .expect(200)
      const { data: data_2, meta: meta_2 } = response_2.body

      expect(data_2).toHaveLength(4)
      expect(meta_2).toEqual({
        totalCount: 10,
        keyword: '',
        limit: 4,
        cursor: 4,
        nextCursor: 8,
      })

      const response_3 = await request(app)
        .get(route)
        .query({ limit: 4, cursor: 8 })
        .expect(200)
      const { data: data_3, meta: meta_3 } = response_3.body

      expect(data_3).toHaveLength(2)
      expect(meta_3).toEqual({
        totalCount: 10,
        keyword: '',
        limit: 4,
        cursor: 8,
        nextCursor: null,
      })
    })
  })
})
