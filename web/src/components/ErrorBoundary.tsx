import React from 'react'
import styled from 'styled-components'
import { theme } from 'styled-tools'

interface ErrorBoundaryProps {
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={this.props.className}>
          <h1>Sorry, Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>TRY AGAIN</button>
        </div>
      )
    }

    return this.props.children
  }
}

const StyledErrorBoundary = styled(ErrorBoundary)`
  width: 100%;
  height: 80vh;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  > h1 {
    font-size: 20px;
    margin: 0;
  }

  > p {
    color: ${theme('colors.textSecondary')};
    font-size: 14px;
  }

  > button {
    color: ${theme('colors.white')};
    background-color: ${theme('colors.primary')};
    font-size: 20px;
    border: none;
    border-radius: 15px;
    margin-top: 20px;
    padding: 5px 20px;
    cursor: pointer;
  }
`

export { StyledErrorBoundary as ErrorBoundary }
