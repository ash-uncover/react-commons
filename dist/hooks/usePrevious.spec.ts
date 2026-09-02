/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import { usePrevious } from './usePrevious'

describe('usePrevious', () => {

  // #region initial render
  describe('initial render', () => {

    test('returns null on the first render (no previous value)', () => {
      // Declaration
      // Execution
      const { result } = renderHook(({ value }) => usePrevious(value), {
        initialProps: { value: 'hello' },
      })
      // Assertions
      expect(result.current).toBeNull()
    })

  })
  // #endregion

  // #region after update
  describe('after update', () => {

    test('returns the previous value after the prop changes', () => {
      // Declaration
      const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
        initialProps: { value: 'hello' },
      })
      // Execution
      rerender({ value: 'world' })
      // Assertions
      expect(result.current).toBe('hello')
    })

    test('tracks multiple consecutive changes', () => {
      // Declaration
      const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
        initialProps: { value: 1 },
      })
      // Execution
      rerender({ value: 2 })
      rerender({ value: 3 })
      // Assertions
      expect(result.current).toBe(2)
    })

  })
  // #endregion

})
