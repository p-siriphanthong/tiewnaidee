import React, { useState } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { Trip } from '../../models/Trip'
import { useQueryParamState } from '../../hooks/useQueryParamState'
import { useDebouncedState } from '../../hooks/useDebouncedState'
import { useTripList } from '../../hooks/useTripList'

interface ShowingTripPhoto {
  sources: string[]
  currentIndex: number
}

interface HomePageProps {
  trips: Trip[]
  keyword: string
  isLoadingTrips: boolean
  isLoadingMoreTrips: boolean
  canLoadMoreTrips: boolean
  showingTripPhotos: ShowingTripPhoto | null
  loadMoreTrips: () => void
  onChangeKeyword: (keyword: string) => void
  onSelectTripTag: (tag: string) => void
  showTripPhotos: (photos: string[], index?: number) => void
  clearShowingTripPhotos: () => void
}

const LIMIT = 5

export function withHomePage(Component: React.FC<HomePageProps>) {
  function WithHomePage() {
    const [
      showingTripPhotos,
      setShowingTripPhotos,
    ] = useState<ShowingTripPhoto | null>(null)
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

    function showTripPhotos(photos: string[], index: number = 0) {
      setShowingTripPhotos({ sources: photos, currentIndex: index })
    }

    function clearShowingTripPhotos() {
      setShowingTripPhotos(null)
    }

    const pageProps = {
      trips,
      keyword,
      isLoadingTrips,
      isLoadingMoreTrips,
      canLoadMoreTrips: hasMoreTrips && !isLoadingMoreTrips,
      showingTripPhotos,
      loadMoreTrips,
      onChangeKeyword: setKeyword,
      onSelectTripTag,
      showTripPhotos,
      clearShowingTripPhotos,
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
