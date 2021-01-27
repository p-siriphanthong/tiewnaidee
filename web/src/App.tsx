import React from 'react'

import { ErrorBoundary } from './components/ErrorBoundary'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  )
}

export default App
