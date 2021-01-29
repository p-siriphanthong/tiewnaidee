import { renderHook, act } from '../test-utils/react-hooks'
import { useDebouncedState } from './useDebouncedState'

beforeAll(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

async function setup(value) {
  const initialProps = { value, delay: 100 }
  const renderHookResult = renderHook(
    ({ value, delay }) => useDebouncedState(value, delay),
    { initialProps }
  )
  return {
    ...renderHookResult,
    rerender: value => renderHookResult.rerender({ ...initialProps, value }),
  }
}

describe('useDebouncedState', () => {
  it('should update value after given amount of time', async () => {
    await act(async () => {
      const { result, rerender } = await setup('initial')
      expect(result.current[0]).toEqual('initial')

      rerender('updated')

      act(() => jest.advanceTimersByTime(99))
      expect(result.current[0]).toEqual('initial')

      act(() => jest.advanceTimersByTime(1))
      expect(result.current[0]).toEqual('updated')
    })
  })

  it('should update value immediately after using setFunction', async () => {
    await act(async () => {
      const { result } = await setup('initial')
      expect(result.current[0]).toEqual('initial')

      result.current[1]('updated')
      expect(result.current[0]).toEqual('updated')
    })
  })
})
