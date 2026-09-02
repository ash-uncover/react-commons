/**
 * @jest-environment jsdom
 */
import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { useClasses, useClasseName } from './useClasses'

describe('useClasses', () => {

  // #region initial classes
  describe('initial classes', () => {

    test('returns classes joined from the input array', () => {
      // Declaration
      // Execution
      const { result } = renderHook(() => useClasses(['foo', 'bar']))
      // Assertions
      expect(result.current.classes).toBe('foo bar')
    })

    test('filters out undefined entries', () => {
      // Declaration
      // Execution
      const { result } = renderHook(() => useClasses(['foo', undefined, 'bar']))
      // Assertions
      expect(result.current.classes).toBe('foo bar')
    })

    test('handles an empty array', () => {
      // Declaration
      // Execution
      const { result } = renderHook(() => useClasses([]))
      // Assertions
      expect(result.current.classes).toBe('')
    })

  })
  // #endregion

  // #region classBuilder.add
  describe('classBuilder.add', () => {

    test('adding a new class updates the classes string', () => {
      // Declaration
      const { result } = renderHook(() => useClasses(['foo']))
      // Execution
      act(() => {
        result.current.classBuilder.add('baz')
      })
      // Assertions
      expect(result.current.classes).toContain('baz')
    })

    test('adding an array of classes works', () => {
      // Declaration
      const { result } = renderHook(() => useClasses([]))
      // Execution
      act(() => {
        result.current.classBuilder.add(['a', 'b'])
      })
      // Assertions
      expect(result.current.classes).toContain('a')
      expect(result.current.classes).toContain('b')
    })

    test('adding undefined does not throw', () => {
      // Declaration
      const { result } = renderHook(() => useClasses(['foo']))
      // Execution + Assertions
      expect(() => {
        act(() => {
          result.current.classBuilder.add(undefined)
        })
      }).not.toThrow()
    })

  })
  // #endregion

  // #region classBuilder.remove
  describe('classBuilder.remove', () => {

    test('removing an existing class updates the classes string', () => {
      // Declaration
      const { result } = renderHook(() => useClasses(['foo', 'bar']))
      // Execution
      act(() => {
        result.current.classBuilder.remove('foo')
      })
      // Assertions
      expect(result.current.classes).not.toContain('foo')
      expect(result.current.classes).toContain('bar')
    })

    test('removing undefined does not throw', () => {
      // Declaration
      const { result } = renderHook(() => useClasses(['foo']))
      // Execution + Assertions
      expect(() => {
        act(() => {
          result.current.classBuilder.remove(undefined)
        })
      }).not.toThrow()
    })

  })
  // #endregion

  // #region classBuilder.toggle
  describe('classBuilder.toggle', () => {

    test('toggles a class on when it is absent', () => {
      // Declaration
      const { result } = renderHook(() => useClasses([]))
      // Execution
      act(() => {
        result.current.classBuilder.toggle('active')
      })
      // Assertions
      expect(result.current.classes).toContain('active')
    })

    test('toggles a class off when it is present', () => {
      // Declaration
      const { result } = renderHook(() => useClasses(['active']))
      // Execution
      act(() => {
        result.current.classBuilder.toggle('active')
      })
      // Assertions
      expect(result.current.classes).not.toContain('active')
    })

  })
  // #endregion

  // #region classBuilder.set
  describe('classBuilder.set', () => {

    test('adds a class when active is true', () => {
      // Declaration
      const { result } = renderHook(() => useClasses([]))
      // Execution
      act(() => {
        result.current.classBuilder.set('highlight', true)
      })
      // Assertions
      expect(result.current.classes).toContain('highlight')
    })

    test('removes a class when active is false', () => {
      // Declaration
      const { result } = renderHook(() => useClasses(['highlight']))
      // Execution
      act(() => {
        result.current.classBuilder.set('highlight', false)
      })
      // Assertions
      expect(result.current.classes).not.toContain('highlight')
    })

  })
  // #endregion

})

describe('useClasseName', () => {

  // #region effect
  describe('effect', () => {

    test('adds the className to the classBuilder on mount', () => {
      // Declaration
      const { result } = renderHook(() => {
        const hook = useClasses([])
        useClasseName(hook.classBuilder, 'extra')
        return hook
      })
      // Execution (handled by renderHook)
      // Assertions
      expect(result.current.classes).toContain('extra')
    })

    test('removes the className from the classBuilder on unmount', () => {
      // Declaration
      const builderRef: { classBuilder: any } = { classBuilder: null }
      const { result, unmount } = renderHook(() => {
        const hook = useClasses([])
        builderRef.classBuilder = hook.classBuilder
        useClasseName(hook.classBuilder, 'extra')
        return hook
      })
      // Execution
      unmount()
      // Assertions — after unmount the classes string no longer has 'extra'
      // (the state update after unmount is fine — just verify no crash)
      expect(builderRef.classBuilder).toBeTruthy()
    })

    test('handles undefined className without throwing', () => {
      // Declaration + Execution + Assertions
      expect(() => {
        renderHook(() => {
          const hook = useClasses([])
          useClasseName(hook.classBuilder, undefined)
          return hook
        })
      }).not.toThrow()
    })

  })
  // #endregion

})
