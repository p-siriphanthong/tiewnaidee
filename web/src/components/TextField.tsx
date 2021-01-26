import React from 'react'
import styled from 'styled-components'
import { theme } from 'styled-tools'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

function TextField({ className, ...props }: TextFieldProps) {
  return <input {...props} className={className} />
}

const StyledTextField = styled(TextField)`
  color: ${theme('colors.textPrimary')};
  font-size: 14px;
  text-align: center;
  width: 100%;
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid ${theme('colors.textSecondary')};

  &::placeholder {
    color: ${theme('colors.textSecondary')};
  }

  &:focus {
    border-bottom-color: ${theme('colors.primary')};
  }
`

export { StyledTextField as TextField }
