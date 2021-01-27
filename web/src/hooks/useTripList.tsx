import { useInfiniteQuery } from 'react-query'

import { useAppClient } from './useAppClient'
import { transformTrip } from '../models/Trip'

interface UseTripListParams {
  queryParams?: {
    keyword?: string
    limit?: number
  }
}

export function useTripList({ queryParams }: UseTripListParams = {}) {
  const client = useAppClient()
  const { data, ...query } = useInfiniteQuery(
    ['trips', queryParams],
    ({ pageParam: cursor }) => client?.getTrips({ ...queryParams, cursor }),
    {
      getNextPageParam: (lastPage: any) => lastPage.meta.nextCursor,
    }
  )

  return {
    ...query,
    data: data?.pages.flatMap(page => page.data.map(transformTrip)) ?? [],
  }
}
