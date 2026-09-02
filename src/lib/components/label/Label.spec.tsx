/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import { Label } from './Label'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
  }
})

describe('Label', () => {

  // #region default (div) render
  describe('default render (div)', () => {

    test('renders a div when preferSpan is not set', () => {
      // Declaration
      // Execution
      const { container } = render(<Label text='Hello' />)
      // Assertions
      expect(container.querySelector('div')).toBeInTheDocument()
      expect(container.querySelector('span')).not.toBeInTheDocument()
    })

    test('renders text content in div', () => {
      // Declaration
      // Execution
      const { container } = render(<Label text='Hello' />)
      // Assertions
      expect(container.firstChild).toHaveTextContent('Hello')
    })

    test('renders children over text when both are provided', () => {
      // Declaration
      // Execution
      const { getByTestId } = render(
        <Label text='Ignored'>
          <span data-testid='child'>Child content</span>
        </Label>
      )
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument()
    })

  })
  // #endregion

  // #region span render
  describe('span render (preferSpan)', () => {

    test('renders a span when preferSpan is true', () => {
      // Declaration
      // Execution
      const { container } = render(<Label preferSpan text='Hello' />)
      // Assertions
      expect(container.querySelector('span')).toBeInTheDocument()
      expect(container.querySelector('div')).not.toBeInTheDocument()
    })

    test('renders text content in span', () => {
      // Declaration
      // Execution
      const { container } = render(<Label preferSpan text='Hello' />)
      // Assertions
      expect(container.firstChild).toHaveTextContent('Hello')
    })

    test('renders children over text when preferSpan is true', () => {
      // Declaration
      // Execution
      const { getByTestId } = render(
        <Label preferSpan text='Ignored'>
          <span data-testid='child'>Child content</span>
        </Label>
      )
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument()
    })

  })
  // #endregion

  // #region className passthrough
  describe('className passthrough', () => {

    test('applies custom className', () => {
      // Declaration
      // Execution
      const { container } = render(<Label className='my-label' text='Hi' />)
      // Assertions
      expect(container.firstChild).toHaveClass('my-label')
    })

  })
  // #endregion

})
