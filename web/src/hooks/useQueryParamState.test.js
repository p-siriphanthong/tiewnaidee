import { renderHook, act } from '../test-utils/react-hooks'
import { useQueryParamState } from './useQueryParamState'

window.history.pushState = jest.fn()

async function setup() {
  const renderHookResult = renderHook(() =>
    useQueryParamState('key', 'initial')
  )
  return renderHookResult
}

describe('useQueryParamState', () => {
  it('should set search param correctly', async () => {
    await act(async () => {
      const { result } = await setup()
      expect(result.current[0]).toBe('initial')

      result.current[1]('value')

      expect(result.current[0]).toBe('value')
      expect(window.history.pushState).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost/?key=value'
      )
    })
  })

  it('should remove search param correctly', async () => {
    await act(async () => {
      const { result } = await setup()
      expect(result.current[0]).toBe('initial')

      result.current[1]('')

      expect(result.current[0]).toBe('')
      expect(window.history.pushState).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost/?'
      )
    })
  })
})
