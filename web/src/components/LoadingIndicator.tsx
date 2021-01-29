import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from 'styled-tools'

interface LoadingIndicatorProps {
  className?: string
}

function LoadingIndicator({ className }: LoadingIndicatorProps) {
  return (
    <div className={className}>
      <div className='lds-ring'>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const StyledLoadingIndicator = styled(LoadingIndicator)`
  text-align: center;
  width: 100%;
  padding: 100px 0;

  > .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    > div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid ${theme('colors.primary')};
      border-radius: 50%;
      animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${theme('colors.primary')} transparent transparent
        transparent;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }

      &:nth-child(2) {
        animation-delay: -0.3s;
      }

      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }
`

export { StyledLoadingIndicator as LoadingIndicator }
