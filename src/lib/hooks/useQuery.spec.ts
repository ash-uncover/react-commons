/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react'

const mockLocation = { pathname: '/', search: '' }

jest.mock('react-router', () => ({
  useLocation: () => mockLocation,
}))

import { useQuery } from './useQuery'

describe('useQuery', () => {

  // #region empty search
  describe('empty search string', () => {

    test('returns a URLSearchParams with no entries when search is empty', () => {
      // Declaration
      mockLocation.search = ''
      // Execution
      const { result } = renderHook(() => useQuery())
      // Assertions
      expect([...result.current.entries()]).toHaveLength(0)
    })

  })
  // #endregion

  // #region populated search
  describe('populated search string', () => {

    test('parses a single query parameter', () => {
      // Declaration
      mockLocation.search = '?foo=bar'
      // Execution
      const { result } = renderHook(() => useQuery())
      // Assertions
      expect(result.current.get('foo')).toBe('bar')
    })

    test('parses multiple query parameters', () => {
      // Declaration
      mockLocation.search = '?a=1&b=2'
      // Execution
      const { result } = renderHook(() => useQuery())
      // Assertions
      expect(result.current.get('a')).toBe('1')
      expect(result.current.get('b')).toBe('2')
    })

  })
  // #endregion

})
