/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react'

const mockUseMediaQuery = jest.fn()

jest.mock('react-responsive', () => ({
  useMediaQuery: (query: any) => mockUseMediaQuery(query),
}))

import { useIsPhone } from './useIsPhone'

describe('useIsPhone', () => {

  beforeEach(() => {
    mockUseMediaQuery.mockReset()
  })

  // #region portrait + small width
  describe('portrait and small width', () => {

    test('returns true when portrait and small width', () => {
      // Declaration — portrait=true, smallWidth=true, smallHeight=false
      mockUseMediaQuery
        .mockReturnValueOnce(true)   // small width
        .mockReturnValueOnce(false)  // small height
        .mockReturnValueOnce(true)   // portrait
      // Execution
      const { result } = renderHook(() => useIsPhone())
      // Assertions
      expect(result.current).toBe(true)
    })

    test('returns false when portrait but not small width', () => {
      // Declaration — portrait=true, smallWidth=false, smallHeight=false
      mockUseMediaQuery
        .mockReturnValueOnce(false)  // small width
        .mockReturnValueOnce(false)  // small height
        .mockReturnValueOnce(true)   // portrait
      // Execution
      const { result } = renderHook(() => useIsPhone())
      // Assertions
      expect(result.current).toBe(false)
    })

  })
  // #endregion

  // #region landscape + small height
  describe('landscape and small height', () => {

    test('returns true when landscape and small height', () => {
      // Declaration — portrait=false, smallWidth=false, smallHeight=true
      mockUseMediaQuery
        .mockReturnValueOnce(false)  // small width
        .mockReturnValueOnce(true)   // small height
        .mockReturnValueOnce(false)  // portrait
      // Execution
      const { result } = renderHook(() => useIsPhone())
      // Assertions
      expect(result.current).toBe(true)
    })

    test('returns false when landscape but not small height', () => {
      // Declaration — portrait=false, smallWidth=false, smallHeight=false
      mockUseMediaQuery
        .mockReturnValueOnce(false)  // small width
        .mockReturnValueOnce(false)  // small height
        .mockReturnValueOnce(false)  // portrait
      // Execution
      const { result } = renderHook(() => useIsPhone())
      // Assertions
      expect(result.current).toBe(false)
    })

  })
  // #endregion

})
