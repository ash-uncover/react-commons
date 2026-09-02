/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ...require('./ButtonSemantic'),
  }
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className }: any) =>
    require('react').createElement('span', { 'data-testid': 'mock-fa-icon', className }),
}))

describe('Button', () => {

  // #region render
  describe('render', () => {

    test('renders a button element', () => {
      // Declaration
      // Execution
      const { container } = render(<Button />)
      // Assertions
      expect(container.querySelector('button')).toBeInTheDocument()
    })

    test('renders text when text prop is provided', () => {
      // Declaration
      // Execution
      render(<Button text='Click me' />)
      // Assertions
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    test('renders children', () => {
      // Declaration
      // Execution
      render(<Button><span data-testid='child'>Child</span></Button>)
      // Assertions
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    test('renders icon when icon prop is provided', () => {
      // Declaration
      // Execution
      render(<Button icon={['fas', 'star']} />)
      // Assertions
      const icons = screen.getAllByTestId('mock-fa-icon')
      expect(icons.some(i => i.classList.contains('ap-button__icon-start'))).toBe(true)
    })

    test('does not render icon-start when icon prop is absent', () => {
      // Declaration
      // Execution
      render(<Button text='Save' />)
      // Assertions
      expect(screen.queryByTestId('mock-fa-icon')).toBeNull()
    })

    test('renders iconEnd when iconEnd prop is provided', () => {
      // Declaration
      // Execution
      render(<Button iconEnd={['fas', 'arrow-right']} />)
      // Assertions
      const icons = screen.getAllByTestId('mock-fa-icon')
      expect(icons.some(i => i.classList.contains('ap-button__icon-end'))).toBe(true)
    })

    test('passes type to the native button element', () => {
      // Declaration
      // Execution
      const { container } = render(<Button type='submit' />)
      // Assertions
      expect(container.querySelector('button')).toHaveAttribute('type', 'submit')
    })

    test('passes disabled to the native button element', () => {
      // Declaration
      // Execution
      const { container } = render(<Button disabled />)
      // Assertions
      expect(container.querySelector('button')).toBeDisabled()
    })

    test('passes title to the native button element', () => {
      // Declaration
      // Execution
      const { container } = render(<Button title='My title' />)
      // Assertions
      expect(container.querySelector('button')).toHaveAttribute('title', 'My title')
    })

  })
  // #endregion

  // #region semantic modifier
  describe('semantic modifier', () => {

    test('adds default semantic class when semantic is DEFAULT', () => {
      // Declaration
      // Execution
      const { container } = render(<Button semantic='DEFAULT' />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-button--default')
    })

    test('adds positive semantic class', () => {
      // Declaration
      // Execution
      const { container } = render(<Button semantic='POSITIVE' />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-button--positive')
    })

    test('removes old semantic class and adds new when semantic changes', () => {
      // Declaration
      const { container, rerender } = render(<Button semantic='POSITIVE' />)
      // Execution
      rerender(<Button semantic='NEGATIVE' />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--positive')
      expect(container.firstChild).toHaveClass('ap-button--negative')
    })

    test('cleans up semantic class on unmount', () => {
      // Declaration
      const { unmount } = render(<Button semantic='POSITIVE' />)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region icon-only modifier
  describe('icon-only modifier', () => {

    test('adds icon-only class when only icon is present (no iconEnd, no text, no children)', () => {
      // Declaration
      // Execution
      const { container } = render(<Button icon={['fas', 'star']} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-button--icon-only')
    })

    test('adds icon-only class when only iconEnd is present (no icon, no text, no children)', () => {
      // Declaration
      // Execution
      const { container } = render(<Button iconEnd={['fas', 'star']} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-button--icon-only')
    })

    test('does not add icon-only class when both icon and iconEnd are present', () => {
      // Declaration
      // Execution
      const { container } = render(<Button icon={['fas', 'star']} iconEnd={['fas', 'arrow-right']} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--icon-only')
    })

    test('does not add icon-only class when text is also present', () => {
      // Declaration
      // Execution
      const { container } = render(<Button icon={['fas', 'star']} text='Save' />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--icon-only')
    })

    test('does not add icon-only class when children are present', () => {
      // Declaration
      // Execution
      const { container } = render(
        <Button icon={['fas', 'star']}>
          <span>content</span>
        </Button>
      )
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--icon-only')
    })

    test('removes icon-only class when text is added', () => {
      // Declaration
      const { container, rerender } = render(<Button icon={['fas', 'star']} />)
      // Execution
      rerender(<Button icon={['fas', 'star']} text='Label' />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-button--icon-only')
    })

    test('cleans up icon-only class on unmount', () => {
      // Declaration
      const { unmount } = render(<Button icon={['fas', 'star']} />)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region onClick
  describe('onClick', () => {

    test('calls onClick handler when button is clicked', () => {
      // Declaration
      const onClick = jest.fn()
      const { container } = render(<Button onClick={onClick} />)
      // Execution
      fireEvent.click(container.querySelector('button') as HTMLElement)
      // Assertions
      expect(onClick).toHaveBeenCalledTimes(1)
    })

  })
  // #endregion

})
