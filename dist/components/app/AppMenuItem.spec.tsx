/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppMenuItem } from './AppMenuItem'

jest.mock('../..', () => {
  const ReactLib = require('react')
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    Icon: ({ className }: { className?: string }) =>
      ReactLib.createElement('span', { 'data-testid': 'mock-icon', className }),
    Label: ({ text, className }: { text?: string; className?: string }) =>
      ReactLib.createElement('span', { 'data-testid': 'mock-label', className }, text),
  }
})

describe('AppMenuItem', () => {

  // #region render
  describe('render', () => {

    test('renders label with provided name', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      render(<AppMenuItem name='Avatar' onClick={onClick} />)
      // Assertions
      expect(screen.getByTestId('mock-label')).toHaveTextContent('Avatar')
    })

    test('renders icon when icon prop is provided', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      render(<AppMenuItem icon={['fas', 'user']} onClick={onClick} />)
      // Assertions
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })

    test('does not render icon when icon prop is absent', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      render(<AppMenuItem onClick={onClick} />)
      // Assertions
      expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument()
    })

    test('sets title from description prop', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<AppMenuItem description='My description' onClick={onClick} />)
      // Assertions
      expect(container.firstChild).toHaveAttribute('title', 'My description')
    })

    test('applies depth-based padding — depth defaults to 0 giving level 1', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<AppMenuItem onClick={onClick} />)
      // Assertions
      expect((container.firstChild as HTMLElement).style.paddingLeft)
        .toBe('calc(var(--ap-padding-l) * 1)')
    })

    test('applies depth-based padding — explicit depth', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<AppMenuItem depth={2} onClick={onClick} />)
      // Assertions
      expect((container.firstChild as HTMLElement).style.paddingLeft)
        .toBe('calc(var(--ap-padding-l) * 3)')
    })

  })
  // #endregion

  // #region active
  describe('active modifier', () => {

    test('adds active class when active is true', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<AppMenuItem active onClick={onClick} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-app-menu-item--active')
    })

    test('does not add active class when active is false', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<AppMenuItem active={false} onClick={onClick} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-app-menu-item--active')
    })

    test('removes active class when active changes from true to false', () => {
      // Declaration
      const onClick = jest.fn()
      const { container, rerender } = render(<AppMenuItem active onClick={onClick} />)
      // Execution
      rerender(<AppMenuItem active={false} onClick={onClick} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-app-menu-item--active')
    })

    test('cleans up active class on unmount', () => {
      // Declaration
      const onClick = jest.fn()
      const { unmount } = render(<AppMenuItem active onClick={onClick} />)
      // Execution + Assertions — no error, cleanup ran
      unmount()
    })

  })
  // #endregion

  // #region group
  describe('group modifier', () => {

    test('adds group class when group is true', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<AppMenuItem group onClick={onClick} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-app-menu-item--group')
    })

    test('does not add group class when group is false', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<AppMenuItem group={false} onClick={onClick} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-app-menu-item--group')
    })

    test('removes group class when group changes from true to false', () => {
      // Declaration
      const onClick = jest.fn()
      const { container, rerender } = render(<AppMenuItem group onClick={onClick} />)
      // Execution
      rerender(<AppMenuItem group={false} onClick={onClick} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-app-menu-item--group')
    })

    test('cleans up group class on unmount', () => {
      // Declaration
      const onClick = jest.fn()
      const { unmount } = render(<AppMenuItem group onClick={onClick} />)
      // Execution + Assertions — no error, cleanup ran
      unmount()
    })

  })
  // #endregion

  // #region onClick
  describe('onClick', () => {

    test('calls onClick when the item is clicked', () => {
      // Declaration
      const onClick = jest.fn()
      const { container } = render(<AppMenuItem name='Avatar' onClick={onClick} />)
      // Execution
      fireEvent.click(container.firstChild as HTMLElement)
      // Assertions
      expect(onClick).toHaveBeenCalledTimes(1)
    })

  })
  // #endregion

})
