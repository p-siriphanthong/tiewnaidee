import React from 'react'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import { Photo } from './Photo'
import { Trip } from '../models/Trip'

interface TripCardProps extends Trip {
  className?: string
  onSelectTripTag: (tag: string) => void
}

function TripCard({
  className,
  eid,
  title,
  url,
  description,
  shortContent,
  photos,
  tags,
  onSelectTripTag,
}: TripCardProps) {
  const [mainPhoto, ...otherPhotos] = photos
  const numberOfMorePhoto = 3
  const numberOfRestPhoto = otherPhotos.length - numberOfMorePhoto

  return (
    <div className={className}>
      <a className='main-photo' href={url} target='__blank'>
        <Photo src={mainPhoto} alt={title} ratio={2 / 3} />
      </a>
      <div className='detail'>
        <div>
          <a className='title' href={url} target='__blank'>
            {title}
          </a>
          <div className='description'>{description}</div>
          <div className='content'>
            <div>{shortContent}</div>
            <a href={url} target='__blank'>
              อ่านต่อ
            </a>
          </div>
          <div className='tags'>
            หมวด -{' '}
            {tags.map((tag, index) => (
              <div key={`trip-${eid}-tag-${index}`}>
                <span onClick={() => onSelectTripTag(tag)}>{tag}</span>
                {index < tags.length - 2 ? ', ' : ''}
                {index === tags.length - 2 ? ' และ ' : ''}
              </div>
            ))}
          </div>
        </div>
        <div className='other-photos'>
          {otherPhotos.slice(0, numberOfMorePhoto).map((photo, index) => (
            <div key={`trip-${eid}-photo-${index}`}>
              <Photo src={photo} alt={title} />
              {index === numberOfMorePhoto - 1 && numberOfRestPhoto ? (
                <div className='more'>+{numberOfRestPhoto}</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const StyledTripCard = styled(TripCard)`
  padding: 20px 0;
  display: flex;

  > .main-photo {
    width: 33.33%;
    max-width: 150px;
    margin-right: 20px;

    > ${Photo} {
      border-radius: 10px;
      overflow: hidden;
    }
  }

  > .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > div {
      > .title {
        color: ${theme('colors.textPrimary')};
        font-size: 16px;
        font-weight: 500;
        text-decoration: none;
        margin: 10px 0;
        display: block;
      }

      > .description {
        color: ${theme('colors.textSecondary')};
        font-size: 12px;
        margin-bottom: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      > .content {
        font-size: 12px;
        margin-bottom: 5px;
        display: flex;

        > div {
          color: ${theme('colors.textSecondary')};
          width: calc(100vw - 180px);
          max-width: 300px;
          margin-right: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        > a {
          color: ${theme('colors.primary')};
        }
      }

      > .tags {
        color: ${theme('colors.textSecondary')};
        font-size: 10px;

        > div {
          display: contents;

          > span {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }

    > .other-photos {
      margin-top: 15px;
      display: flex;

      > div {
        width: 15%;
        margin-right: 3%;
        border-radius: 10px;
        overflow: hidden;
        position: relative;

        > .more {
          color: ${theme('colors.white')};
          background-color: rgba(0, 0, 0, 0.6);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  @media (max-width: ${theme('breakpoints.sm')}px) {
    border-bottom: 1px solid ${theme('colors.textSecondary')};
    align-items: flex-start;

    > .main-photo {
      width: 20%;
      margin-right: 15px;
    }

    > .detail {
      > div {
        > .title {
          margin: 0 0 5px 0;
        }

        > .description {
          margin-bottom: 10px;
        }
      }

      > .other-photos > div {
        border-radius: 6px;
      }
    }
  }
`

export { StyledTripCard as TripCard }
