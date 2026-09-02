/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { ShellPage } from './ShellPage'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ShellContainer: ({ children, className, level, style }: any) =>
      require('react').createElement(
        'div',
        { 'data-testid': 'mock-shell-container', className, 'data-level': String(level), style },
        children
      ),
  }
})

describe('ShellPage', () => {

  // #region render
  describe('render', () => {

    test('renders ShellContainer', () => {
      // Declaration
      // Execution
      render(<ShellPage />)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toBeInTheDocument()
    })

    test('applies ap-shell-page class', () => {
      // Declaration
      // Execution
      render(<ShellPage />)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toHaveClass('ap-shell-page')
    })

    test('passes level to ShellContainer', () => {
      // Declaration
      // Execution
      render(<ShellPage level={3} />)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toHaveAttribute('data-level', '3')
    })

    test('renders children', () => {
      // Declaration
      // Execution
      render(
        <ShellPage>
          <span data-testid='child'>Page content</span>
        </ShellPage>
      )
      // Assertions
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    test('applies custom className', () => {
      // Declaration
      // Execution
      render(<ShellPage className='page-extra' />)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toHaveClass('page-extra')
    })

  })
  // #endregion

})
