import React from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AppClientProvider } from './hooks/useAppClient'
import { AppClient } from './lib/__mocks__/AppClient'

const appClient = new AppClient()
const queryClient = new QueryClient()

const AllTheProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppClientProvider client={appClient}>{children}</AppClientProvider>
    </QueryClientProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
