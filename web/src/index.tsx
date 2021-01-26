import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'styled-normalize'
import { theme } from 'styled-tools'

import App from './App'
import { theme as themeConfig } from './theme'
import * as serviceWorker from './serviceWorker'

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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeConfig}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
