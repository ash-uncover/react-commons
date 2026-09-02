/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { ShellContainer, computeContainerLevel, validContainerLevel, getParentContainer } from './ShellContainer'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
  }
})

describe('ShellContainer', () => {

  // #region render
  describe('render', () => {

    test('renders a div with ap-shell-container class', () => {
      // Declaration
      // Execution
      const { container } = render(<ShellContainer />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container')
    })

    test('renders children', () => {
      // Declaration
      // Execution
      render(
        <ShellContainer>
          <span data-testid='child'>Content</span>
        </ShellContainer>
      )
      // Assertions
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    test('applies custom className', () => {
      // Declaration
      // Execution
      const { container } = render(<ShellContainer className='extra' />)
      // Assertions
      expect(container.firstChild).toHaveClass('extra')
    })

  })
  // #endregion

  // #region explicit level
  describe('explicit level prop', () => {

    test('applies level class when level is provided', () => {
      // Declaration
      // Execution
      const { container } = render(<ShellContainer level={2} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container-2')
    })

    test('clamps level to 0 when negative', () => {
      // Declaration
      // Execution
      const { container } = render(<ShellContainer level={-5} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container-0')
    })

    test('clamps level to 10 when above max', () => {
      // Declaration
      // Execution
      const { container } = render(<ShellContainer level={99} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container-10')
    })

    test('cleans up level class on unmount', () => {
      // Declaration
      const { unmount } = render(<ShellContainer level={1} />)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region auto level (no level prop)
  describe('auto level computation (no level prop)', () => {

    test('applies level 0 class when no parent ShellContainer', () => {
      // Declaration
      // Execution
      const { container } = render(<ShellContainer />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-shell-container-0')
    })

  })
  // #endregion

})

describe('computeContainerLevel', () => {

  test('returns 0 for a null element', () => {
    // Declaration
    // Execution
    const result = computeContainerLevel(null as any)
    // Assertions
    expect(result).toBe(0)
  })

  test('returns 0 for an element with no parent shell container', () => {
    // Declaration
    const el = document.createElement('div')
    document.body.appendChild(el)
    // Execution
    const result = computeContainerLevel(el)
    // Assertions
    expect(result).toBe(0)
    document.body.removeChild(el)
  })

  test('returns 1 when immediate parent has ap-shell-container class', () => {
    // Declaration
    const parent = document.createElement('div')
    parent.className = 'ap-shell-container'
    const child = document.createElement('div')
    parent.appendChild(child)
    document.body.appendChild(parent)
    // Execution
    const result = computeContainerLevel(child)
    // Assertions
    expect(result).toBe(1)
    document.body.removeChild(parent)
  })

  test('returns 2 when nested two levels deep', () => {
    // Declaration
    const grandparent = document.createElement('div')
    grandparent.className = 'ap-shell-container'
    const parent = document.createElement('div')
    parent.className = 'ap-shell-container'
    const child = document.createElement('div')
    grandparent.appendChild(parent)
    parent.appendChild(child)
    document.body.appendChild(grandparent)
    // Execution
    const result = computeContainerLevel(child)
    // Assertions
    expect(result).toBe(2)
    document.body.removeChild(grandparent)
  })

})
// #endregion

// #region validContainerLevel
describe('validContainerLevel', () => {

  test('returns the value unchanged when within 0-10', () => {
    expect(validContainerLevel(5)).toBe(5)
  })

  test('clamps to 0 for negative values', () => {
    expect(validContainerLevel(-1)).toBe(0)
  })

  test('clamps to 10 for values above 10', () => {
    expect(validContainerLevel(11)).toBe(10)
  })

})
// #endregion

// #region getParentContainer
describe('getParentContainer', () => {

  test('returns null when element has no parentElement', () => {
    // Declaration
    const el = document.createElement('div')
    // Execution
    const result = getParentContainer(el)
    // Assertions
    expect(result).toBeNull()
  })

  test('returns parent when parent has ap-shell-container class', () => {
    // Declaration
    const parent = document.createElement('div')
    parent.className = 'ap-shell-container'
    const child = document.createElement('div')
    parent.appendChild(child)
    document.body.appendChild(parent)
    // Execution
    const result = getParentContainer(child)
    // Assertions
    expect(result).toBe(parent)
    document.body.removeChild(parent)
  })

  test('walks up the tree to find an ancestor with ap-shell-container class', () => {
    // Declaration
    const ancestor = document.createElement('div')
    ancestor.className = 'ap-shell-container'
    const middle = document.createElement('div')
    const child = document.createElement('div')
    ancestor.appendChild(middle)
    middle.appendChild(child)
    document.body.appendChild(ancestor)
    // Execution
    const result = getParentContainer(child)
    // Assertions
    expect(result).toBe(ancestor)
    document.body.removeChild(ancestor)
  })

  test('returns null when no ancestor has ap-shell-container class', () => {
    // Declaration
    const parent = document.createElement('div')
    const child = document.createElement('div')
    parent.appendChild(child)
    document.body.appendChild(parent)
    // Execution
    const result = getParentContainer(child)
    // Assertions
    expect(result).toBeNull()
    document.body.removeChild(parent)
  })

})
// #endregion
