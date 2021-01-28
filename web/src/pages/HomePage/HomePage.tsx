import React from 'react'
import Headroom from 'react-headroom'
import { Waypoint } from 'react-waypoint'
import Carousel, { Modal, ModalGateway } from 'react-images'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import { TextField } from '../../components/TextField'
import { TripCard } from '../../components/TripCard'
import { LoadingIndicator } from '../../components/LoadingIndicator'
import { LoadingMoreIndicator } from '../../components/LoadingMoreIndicator'
import { Trip } from '../../models/Trip'

interface HomePageProps {
  className?: string
  trips: Trip[]
  keyword: string
  isLoadingTrips: boolean
  isLoadingMoreTrips: boolean
  canLoadMoreTrips: boolean
  showingTripPhotos: { sources: string[]; currentIndex: number } | null
  loadMoreTrips: () => void
  onChangeKeyword: (keyword: string) => void
  onSelectTripTag: (tag: string) => void
  showTripPhotos: (photos: string[], index?: number) => void
  clearShowingTripPhotos: () => void
}

function HomePage({
  className,
  trips,
  keyword,
  isLoadingTrips,
  isLoadingMoreTrips,
  canLoadMoreTrips,
  showingTripPhotos,
  loadMoreTrips,
  onChangeKeyword,
  onSelectTripTag,
  showTripPhotos,
  clearShowingTripPhotos,
}: HomePageProps) {
  const isEmpty = trips.length === 0
  return (
    <>
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
        <div
          className={`content ${isLoadingTrips || isEmpty ? 'no-content' : ''}`}
        >
          {isLoadingTrips ? (
            <LoadingIndicator />
          ) : (
            <>
              {isEmpty ? (
                <div className='empty'>ไม่พบทริปเที่ยว</div>
              ) : (
                <>
                  {trips.map(trip => (
                    <TripCard
                      {...trip}
                      key={`trip-${trip.eid}`}
                      onSelectTripTag={onSelectTripTag}
                      showTripPhotos={showTripPhotos}
                    />
                  ))}
                  {isLoadingMoreTrips && <LoadingMoreIndicator />}
                  {canLoadMoreTrips && <Waypoint onEnter={loadMoreTrips} />}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <ModalGateway>
        {showingTripPhotos && (
          <Modal onClose={clearShowingTripPhotos}>
            <Carousel
              views={showingTripPhotos.sources.map(source => ({ source }))}
              currentIndex={showingTripPhotos.currentIndex}
            />
          </Modal>
        )}
      </ModalGateway>
    </>
  )
}

const StyledHomePage = styled(HomePage)`
  width: 100%;
  max-width: ${theme('breakpoints.sm')}px;
  padding: 50px 15px;
  margin: 0 auto;

  > .headroom-wrapper {
    height: auto !important;

    > .headroom {
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
        color: ${theme('colors.white')};
        background-color: ${theme('colors.primary')};

        > .title {
          color: ${theme('colors.white')};
          font-size: 20px;
          margin-bottom: 5px;
        }

        > .search-box > ${TextField} {
          border-radius: 4px;
          border-bottom: none;
        }
      }
    }
  }

  > .content {
    &.no-content {
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    > .empty {
      color: ${theme('colors.textSecondary')};
      font-size: 24px;
      font-weight: 500;
    }
  }

  @media (max-width: ${theme('breakpoints.sm')}px) {
    padding: 15px;
  }
`

export { StyledHomePage as HomePage }
