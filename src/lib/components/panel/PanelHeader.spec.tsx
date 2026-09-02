/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { PanelHeader } from './PanelHeader'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
  }
})

describe('PanelHeader', () => {

  // #region render
  describe('render', () => {

    test('renders a div with ap-panel-header class', () => {
      // Declaration
      // Execution
      const { container } = render(<PanelHeader />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-panel-header')
    })

    test('renders children', () => {
      // Declaration
      // Execution
      render(
        <PanelHeader>
          <span data-testid='child'>Header content</span>
        </PanelHeader>
      )
      // Assertions
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    test('applies custom className', () => {
      // Declaration
      // Execution
      const { container } = render(<PanelHeader className='extra' />)
      // Assertions
      expect(container.firstChild).toHaveClass('extra')
    })

  })
  // #endregion

})
