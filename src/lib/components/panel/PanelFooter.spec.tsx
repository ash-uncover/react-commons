/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { PanelFooter } from './PanelFooter'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
  }
})

describe('PanelFooter', () => {

  // #region render
  describe('render', () => {

    test('renders a div with ap-panel-footer class', () => {
      // Declaration
      // Execution
      const { container } = render(<PanelFooter />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-panel-footer')
    })

    test('renders children', () => {
      // Declaration
      // Execution
      render(
        <PanelFooter>
          <span data-testid='child'>Footer content</span>
        </PanelFooter>
      )
      // Assertions
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    test('applies custom className', () => {
      // Declaration
      // Execution
      const { container } = render(<PanelFooter className='extra' />)
      // Assertions
      expect(container.firstChild).toHaveClass('extra')
    })

  })
  // #endregion

})
