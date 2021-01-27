import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'styled-normalize'
import { theme } from 'styled-tools'

import App from './App'
import { theme as themeConfig } from './theme'
import * as serviceWorker from './serviceWorker'
import { AppClientProvider } from './hooks/useAppClient'
import { AppClient } from './lib/AppClient'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    font-family: 'Kanit', sans-serif;
    font-weight: 300;
    line-height: 1.4;
    outline: none;
    box-sizing: border-box;
  }
 
  body {
    color: ${theme('colors.textPrimary')};
  }
`

const appClient = new AppClient()
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppClientProvider client={appClient}>
        <ThemeProvider theme={themeConfig}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </AppClientProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
