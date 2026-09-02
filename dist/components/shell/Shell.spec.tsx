/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Shell } from './Shell'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ShellContainer: ({ children, className, level, style }: any) =>
      require('react').createElement(
        'div',
        { 'data-testid': 'mock-shell-container', className, 'data-level': level, style },
        children
      ),
  }
})

describe('Shell', () => {

  // #region render
  describe('render', () => {

    test('renders ShellContainer with level 0', () => {
      // Declaration
      // Execution
      render(<Shell />)
      // Assertions
      const container = screen.getByTestId('mock-shell-container')
      expect(container).toBeInTheDocument()
      expect(container).toHaveAttribute('data-level', '0')
    })

    test('renders children inside ShellContainer', () => {
      // Declaration
      // Execution
      render(
        <Shell>
          <span data-testid='child'>Content</span>
        </Shell>
      )
      // Assertions
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    test('applies ap-shell class to ShellContainer', () => {
      // Declaration
      // Execution
      render(<Shell />)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toHaveClass('ap-shell')
    })

    test('applies custom className', () => {
      // Declaration
      // Execution
      render(<Shell className='my-shell' />)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toHaveClass('my-shell')
    })

  })
  // #endregion

})
