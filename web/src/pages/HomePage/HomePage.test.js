import React from 'react'

import {
  render,
  screen,
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
} from '../../test-utils'
import * as mockData from '../../lib/__mocks__/trips.fixture'
import { HomePage } from '.'

beforeEach(() => {
  render(<HomePage />)
})

describe('HomePage', () => {
  test('1. render', async () => {
    expect(await screen.findByText('เที่ยวไหนดี')).toBeInTheDocument()

    expect(
      await waitForElement(() =>
        screen.findByText(mockData.tripsWithoutKeyword.data[0].title)
      )
    ).toBeInTheDocument()
  })

  test('2. load more', async () => {
    expect(
      await waitForElement(() =>
        screen.findByText(mockData.tripsWithoutKeywordLoadMore.data[0].title)
      )
    ).toBeInTheDocument()
  })

  test('3. search by not found keyword', async () => {
    const input = screen.getByPlaceholderText('หาที่เที่ยวแล้วไปกัน...')
    fireEvent.change(input, { target: { value: 'not found' } })
    expect(input).toHaveValue('not found')

    await waitForElementToBeRemoved(() =>
      screen.queryByText(mockData.tripsWithoutKeyword.data[0].title)
    )

    expect(
      await waitForElement(() => screen.findByText('ไม่พบทริปเที่ยว'))
    ).toBeInTheDocument()
  })

  test('4. search by found keyword', async () => {
    const input = screen.getByPlaceholderText('หาที่เที่ยวแล้วไปกัน...')
    fireEvent.change(input, { target: { value: 'ภูเขา' } })
    expect(input).toHaveValue('ภูเขา')

    expect(
      await waitForElement(() =>
        screen.findByText(mockData.tripsWithKeyword.data[0].title)
      )
    ).toBeInTheDocument()
  })
})
