import {
  renderHook,
  act,
  waitQueryIsSuccessful,
} from '../test-utils/react-hooks'
import { useTripList } from './useTripList'
import * as mockData from '../lib/__mocks__/trips.fixture'

async function setup({ keyword = '', limit = 5 } = {}) {
  const renderHookResult = renderHook(useTripList, {
    initialProps: { queryParams: { keyword, limit } },
  })

  await waitQueryIsSuccessful(renderHookResult)
  return renderHookResult
}

describe('useTripList', () => {
  test('1. first using', async () => {
    await act(async () => {
      const { result } = await setup()
      const { data, hasNextPage } = result.current

      expect(data).toEqual(mockData.tripsWithoutKeyword.data)
      expect(hasNextPage).toBe(true)
    })
  })

  test('2. fetch next page', async () => {
    await act(async () => {
      const { result } = await setup()
      const { fetchNextPage } = result.current

      await fetchNextPage()
      const { data, hasNextPage } = result.current

      expect(data).toEqual([
        ...mockData.tripsWithoutKeyword.data,
        ...mockData.tripsWithoutKeywordLoadMore.data,
      ])
      expect(hasNextPage).toBe(false)
    })
  })

  test('3. change query params', async () => {
    await act(async () => {
      const { result } = await setup({ keyword: 'ภูเขา' })

      const { data, hasNextPage } = result.current

      expect(data).toEqual(mockData.tripsWithKeyword.data)
      expect(hasNextPage).toBe(false)
    })
  })
})
