/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import { FormGroup } from './FormGroup'
import { FormGroupDirections } from '../..'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ...require('./FormGroupDirection'),
  }
})

describe('FormGroup', () => {

  // #region render
  describe('render', () => {

    test('renders a div', () => {
      // Declaration
      // Execution
      const { container } = render(<FormGroup />)
      // Assertions
      expect(container.querySelector('div')).toBeInTheDocument()
    })

    test('renders children inside the div', () => {
      // Declaration
      // Execution
      const { getByTestId } = render(
        <FormGroup>
          <span data-testid='child'>Child</span>
        </FormGroup>
      )
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument()
    })

  })
  // #endregion

  // #region direction modifier
  describe('direction modifier', () => {

    test('adds vertical class when direction is VERTICAL (default)', () => {
      // Declaration
      // Execution
      const { container } = render(<FormGroup />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-form-group--vertical')
    })

    test('adds horizontal class when direction is HORIZONTAL', () => {
      // Declaration
      // Execution
      const { container } = render(<FormGroup direction={FormGroupDirections.HORIZONTAL} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-form-group--horizontal')
    })

    test('removes old direction class and adds new when direction changes', () => {
      // Declaration
      const { container, rerender } = render(<FormGroup direction={FormGroupDirections.VERTICAL} />)
      // Execution
      rerender(<FormGroup direction={FormGroupDirections.HORIZONTAL} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-form-group--vertical')
      expect(container.firstChild).toHaveClass('ap-form-group--horizontal')
    })

    test('cleans up direction class on unmount', () => {
      // Declaration
      const { unmount } = render(<FormGroup direction={FormGroupDirections.HORIZONTAL} />)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region className passthrough
  describe('className passthrough', () => {

    test('applies custom className', () => {
      // Declaration
      // Execution
      const { container } = render(<FormGroup className='my-group' />)
      // Assertions
      expect(container.firstChild).toHaveClass('my-group')
    })

  })
  // #endregion

})
