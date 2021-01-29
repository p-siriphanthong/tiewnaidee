/* eslint-disable react/jsx-filename-extension */

import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AppClientProvider } from '../hooks/useAppClient'
import { AppClient } from '../lib/__mocks__/AppClient'

const appClient = new AppClient()
const queryClient = new QueryClient()

const AllTheProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppClientProvider client={appClient}>{children}</AppClientProvider>
    </QueryClientProvider>
  )
}

const customRenderHook = (callback, options) =>
  renderHook(callback, { wrapper: AllTheProviders, ...options })

const isQueryStatus = queryResult =>
  queryResult && queryResult.status === 'success'

const waitQueryIsStatus = (
  status,
  renderHookResult,
  { timeout = 5000 } = {}
) => {
  return renderHookResult.waitFor(
    () => isQueryStatus(renderHookResult.result.current, status),
    { timeout }
  )
}

const waitQueryIsLoading = (...params) => {
  return waitQueryIsStatus('loading', ...params)
}

const waitQueryIsSuccessful = (...params) => {
  return waitQueryIsStatus('success', ...params)
}

export * from '@testing-library/react-hooks'
export { customRenderHook as renderHook }
export { waitQueryIsLoading, waitQueryIsSuccessful }
