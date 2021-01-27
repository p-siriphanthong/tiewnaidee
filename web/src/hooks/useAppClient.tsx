import React, { createContext, useContext } from 'react'
import { AppClient } from '../lib/AppClient'

interface AppClientProviderProps {
  children: React.ReactElement
  client: AppClient
}

const AppContext = createContext<{ client?: AppClient }>({})

export function AppClientProvider({
  children,
  client,
}: AppClientProviderProps) {
  const value = {
    client,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppClient() {
  return useContext(AppContext).client
}
