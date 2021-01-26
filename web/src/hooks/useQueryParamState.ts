import { useState } from 'react'

function getQuery() {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search)
  }
  return new URLSearchParams()
}

function getQueryStringVal(key: string): string | null {
  return getQuery().get(key)
}

export function useQueryParamState(key: string, defaultVal: string = '') {
  const [query, setQuery] = useState(getQueryStringVal(key) || defaultVal)

  function updateUrl(newVal: string) {
    setQuery(newVal)

    const query = getQuery()

    if (newVal.trim() !== '') {
      query.set(key, newVal)
    } else {
      query.delete(key)
    }

    if (typeof window !== 'undefined') {
      const { protocol, pathname, host } = window.location
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`
      window.history.pushState({}, '', newUrl)
    }
  }

  return [query, updateUrl]
}
