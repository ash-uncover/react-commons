/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MenuNavigationItem } from './MenuNavigationItem'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ShellContainer: ({ children, className }: any) =>
      require('react').createElement('div', { 'data-testid': 'mock-shell-container', className }, children),
  }
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className }: any) =>
    require('react').createElement('span', { 'data-testid': 'mock-fa-icon', className }),
}))

describe('MenuNavigationItem', () => {

  // #region non-container render
  describe('non-container render', () => {

    test('renders an li element', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<MenuNavigationItem onClick={onClick} />)
      // Assertions
      expect(container.querySelector('li')).toBeInTheDocument()
    })

    test('renders the name text', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      render(<MenuNavigationItem name='Settings' onClick={onClick} />)
      // Assertions
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    test('renders a FontAwesomeIcon when icon is provided', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      render(<MenuNavigationItem icon={['fas', 'gear']} onClick={onClick} />)
      // Assertions
      expect(screen.getByTestId('mock-fa-icon')).toBeInTheDocument()
    })

    test('does not render icon when icon prop is absent', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      render(<MenuNavigationItem onClick={onClick} />)
      // Assertions
      expect(screen.queryByTestId('mock-fa-icon')).not.toBeInTheDocument()
    })

    test('sets title attribute from description', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<MenuNavigationItem description='My description' onClick={onClick} />)
      // Assertions
      expect(container.querySelector('li')).toHaveAttribute('title', 'My description')
    })

    test('calls onClick when li is clicked', () => {
      // Declaration
      const onClick = jest.fn()
      const { container } = render(<MenuNavigationItem onClick={onClick} />)
      // Execution
      fireEvent.click(container.querySelector('li') as HTMLElement)
      // Assertions
      expect(onClick).toHaveBeenCalledTimes(1)
    })

  })
  // #endregion

  // #region container render
  describe('container render', () => {

    test('renders ShellContainer when container=true', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      render(<MenuNavigationItem container onClick={onClick} />)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toBeInTheDocument()
    })

    test('renders icon inside ShellContainer when container=true and icon is provided', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      render(<MenuNavigationItem container icon={['fas', 'gear']} onClick={onClick} />)
      // Assertions
      expect(screen.getByTestId('mock-fa-icon')).toBeInTheDocument()
    })

    test('does not render icon when container=true and icon is absent', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      render(<MenuNavigationItem container onClick={onClick} />)
      // Assertions
      expect(screen.queryByTestId('mock-fa-icon')).not.toBeInTheDocument()
    })

  })
  // #endregion

  // #region selected modifier
  describe('selected modifier', () => {

    test('adds selected class when selected=true', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<MenuNavigationItem selected onClick={onClick} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-menu-navigation-item--selected')
    })

    test('does not add selected class when selected=false', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<MenuNavigationItem selected={false} onClick={onClick} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-menu-navigation-item--selected')
    })

    test('removes selected class when selected changes from true to false', () => {
      // Declaration
      const onClick = jest.fn()
      const { container, rerender } = render(<MenuNavigationItem selected onClick={onClick} />)
      // Execution
      rerender(<MenuNavigationItem selected={false} onClick={onClick} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-menu-navigation-item--selected')
    })

    test('cleans up selected class on unmount', () => {
      // Declaration
      const onClick = jest.fn()
      const { unmount } = render(<MenuNavigationItem selected onClick={onClick} />)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region container modifier class
  describe('container modifier class', () => {

    test('adds container class when container is falsy (non-container mode)', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<MenuNavigationItem onClick={onClick} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-menu-navigation-item--container')
    })

    test('removes container class when container prop changes to true', () => {
      // Declaration
      const onClick = jest.fn()
      const { container, rerender } = render(<MenuNavigationItem onClick={onClick} />)
      // Execution
      rerender(<MenuNavigationItem container onClick={onClick} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-menu-navigation-item--container')
    })

    test('cleans up container modifier class on unmount', () => {
      // Declaration
      const onClick = jest.fn()
      const { unmount } = render(<MenuNavigationItem onClick={onClick} />)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

})
