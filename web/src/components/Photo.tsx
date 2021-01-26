import React from 'react'
import styled from 'styled-components'
import { theme, prop } from 'styled-tools'

interface PhotoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  ratio?: number
}

function Photo({ className, src, alt, ...props }: PhotoProps) {
  return (
    <div className={className}>
      <div>
        {src ? (
          <img {...props} src={src} alt={alt} />
        ) : (
          <div className='no-photo'>No Photo</div>
        )}
      </div>
    </div>
  )
}

const StyledPhoto = styled(Photo)`
  width: 100%;

  > div {
    padding-top: ${props => 100 / prop('ratio', 1)(props)}%;
    width: 100%;
    position: relative;

    > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    > img {
      object-fit: cover;
      object-position: center;
    }

    > .no-photo {
      color: ${theme('colors.textPrimary')};
      background-color: ${theme('colors.textSecondary')};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export { StyledPhoto as Photo }
