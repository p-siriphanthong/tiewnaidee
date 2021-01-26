import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { Trip } from '../../models/Trip'
import { useQueryParamState } from '../../hooks/useQueryParamState'
import { useDebouncedState } from '../../hooks/useDebouncedState'

// TODO: get from api
import tripData from './db.json'

interface HomePageProps {
  trips: Trip[]
  keyword: string
  onChangeKeyword: (keyword: string) => void
  onSelectTripTag: (tag: string) => void
}

export function withHomePage(Component: React.FC<HomePageProps>) {
  function WithHomePage() {
    const [keyword, setKeyword]: any = useQueryParamState('keyword')
    const [searchingKeyword, setSearchingKeyword]: any = useDebouncedState(
      keyword,
      500
    )

    function onSelectTripTag(tag: string) {
      setKeyword(tag)
      setSearchingKeyword(tag)
    }

    const pageProps = {
      trips: tripData.trips,
      keyword,
      onChangeKeyword: setKeyword,
      onSelectTripTag,
    }

    return <Component {...pageProps} />
  }

  hoistNonReactStatics(WithHomePage, Component)

  WithHomePage.displayName = `withHomePage(${
    Component.displayName ?? Component.name ?? 'Component'
  })`

  return WithHomePage
}
