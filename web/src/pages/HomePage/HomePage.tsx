import React from 'react'
import Headroom from 'react-headroom'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import { TextField } from '../../components/TextField'
import { TripCard } from '../../components/TripCard'
import { Trip } from '../../models/Trip'

interface HomePageProps {
  className?: string
  trips: Trip[]
  keyword: string
  onChangeKeyword: (keyword: string) => void
  onSelectTripTag: (tag: string) => void
}

function HomePage({
  className,
  trips,
  keyword,
  onChangeKeyword,
  onSelectTripTag,
}: HomePageProps) {
  return (
    <div className={className}>
      <Headroom pinStart={200}>
        <h1 className='title'>เที่ยวไหนดี</h1>
        <div className='search-box'>
          <TextField
            value={keyword}
            placeholder='หาที่เที่ยวแล้วไปกัน...'
            onChange={event => onChangeKeyword(event.target.value)}
          />
        </div>
      </Headroom>
      {trips.map(trip => (
        <TripCard
          {...trip}
          key={`trip-${trip.eid}`}
          onSelectTripTag={onSelectTripTag}
        />
      ))}
    </div>
  )
}

const StyledHomePage = styled(HomePage)`
  width: 100%;
  max-width: ${theme('breakpoints.sm')}px;
  padding: 50px 15px;
  margin: 0 auto;
  overflow: auto;

  .headroom {
    > .title {
      color: ${theme('colors.primary')};
      font-size: 36px;
      font-weight: 300;
      text-align: center;
    }

    > .search-box {
      padding: 0 20px;
      margin-bottom: 10px;
    }

    &.headroom--pinned {
      color: #ffffff;
      background-color: ${theme('colors.primary')};

      > .title {
        color: #ffffff;
        font-size: 20px;
        margin-bottom: 5px;
      }

      > .search-box > ${TextField} {
        border-radius: 4px;
        border-bottom: none;
      }
    }
  }

  @media (max-width: ${theme('breakpoints.sm')}px) {
    padding: 15px;
  }
`

export { StyledHomePage as HomePage }
