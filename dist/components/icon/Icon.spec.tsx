/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import { Icon } from './Icon'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
  }
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className, style, icon }: any) =>
    require('react').createElement('span', {
      'data-testid': 'mock-fa-icon',
      'data-icon': String(icon),
      className,
      style,
    }),
}))

describe('Icon', () => {

  // #region render
  describe('render', () => {

    test('renders a FontAwesomeIcon', () => {
      // Declaration
      // Execution
      const { getByTestId } = render(<Icon icon={['fas', 'star']} />)
      // Assertions
      expect(getByTestId('mock-fa-icon')).toBeInTheDocument()
    })

    test('passes the icon prop to FontAwesomeIcon', () => {
      // Declaration
      // Execution
      const { getByTestId } = render(<Icon icon={['fas', 'star']} />)
      // Assertions
      expect(getByTestId('mock-fa-icon')).toHaveAttribute('data-icon', 'fas,star')
    })

    test('applies the ap-icon base class', () => {
      // Declaration
      // Execution
      const { getByTestId } = render(<Icon icon={['fas', 'star']} />)
      // Assertions
      expect(getByTestId('mock-fa-icon')).toHaveClass('ap-icon')
    })

  })
  // #endregion

  // #region className passthrough
  describe('className passthrough', () => {

    test('applies custom className', () => {
      // Declaration
      // Execution
      const { getByTestId } = render(<Icon className='my-icon' icon={['fas', 'star']} />)
      // Assertions
      expect(getByTestId('mock-fa-icon')).toHaveClass('my-icon')
    })

  })
  // #endregion

})
