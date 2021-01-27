import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { Trip } from '../../models/Trip'
import { useQueryParamState } from '../../hooks/useQueryParamState'
import { useDebouncedState } from '../../hooks/useDebouncedState'
import { useTripList } from '../../hooks/useTripList'

interface HomePageProps {
  trips: Trip[]
  keyword: string
  isLoadingTrips: boolean
  isLoadingMoreTrips: boolean
  canLoadMoreTrips: boolean
  loadMoreTrips: () => void
  onChangeKeyword: (keyword: string) => void
  onSelectTripTag: (tag: string) => void
}

const LIMIT = 5

export function withHomePage(Component: React.FC<HomePageProps>) {
  function WithHomePage() {
    const [keyword, setKeyword]: any = useQueryParamState('keyword')
    const [searchingKeyword, setSearchingKeyword]: any = useDebouncedState(
      keyword,
      500
    )
    const {
      data: trips,
      isLoading: isLoadingTrips,
      isFetchingNextPage: isLoadingMoreTrips,
      hasNextPage: hasMoreTrips = false,
      fetchNextPage: loadMoreTrips,
      isError,
      error,
    } = useTripList({
      queryParams: {
        keyword: searchingKeyword,
        limit: LIMIT,
      },
    })

    function onSelectTripTag(tag: string) {
      setKeyword(tag)
      setSearchingKeyword(tag)
    }

    const pageProps = {
      trips,
      keyword,
      isLoadingTrips,
      isLoadingMoreTrips,
      canLoadMoreTrips: hasMoreTrips && !isLoadingMoreTrips,
      loadMoreTrips,
      onChangeKeyword: setKeyword,
      onSelectTripTag,
    }

    if (isError) throw error
    return <Component {...pageProps} />
  }

  hoistNonReactStatics(WithHomePage, Component)

  WithHomePage.displayName = `withHomePage(${
    Component.displayName ?? Component.name ?? 'Component'
  })`

  return WithHomePage
}
