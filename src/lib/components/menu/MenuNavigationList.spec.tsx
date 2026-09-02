/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MenuNavigationList } from './MenuNavigationList'
import { MenuNavigationItemProperties } from './MenuNavigationItem'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    MenuNavigationItem: ({ name, onClick }: MenuNavigationItemProperties) =>
      require('react').createElement('li', {
        'data-testid': 'mock-nav-item',
        'data-name': name,
        onClick,
      }),
  }
})

describe('MenuNavigationList', () => {

  // #region render
  describe('render', () => {

    test('renders a ul element', () => {
      // Declaration
      // Execution
      const { container } = render(<MenuNavigationList items={[]} />)
      // Assertions
      expect(container.querySelector('ul')).toBeInTheDocument()
    })

    test('renders a MenuNavigationItem for each item', () => {
      // Declaration
      const items: MenuNavigationItemProperties[] = [
        { name: 'Item 1', onClick: jest.fn() },
        { name: 'Item 2', onClick: jest.fn() },
      ]
      // Execution
      render(<MenuNavigationList items={items} />)
      // Assertions
      expect(screen.getAllByTestId('mock-nav-item')).toHaveLength(2)
    })

    test('passes the name prop to each MenuNavigationItem', () => {
      // Declaration
      const items: MenuNavigationItemProperties[] = [
        { name: 'Settings', onClick: jest.fn() },
      ]
      // Execution
      render(<MenuNavigationList items={items} />)
      // Assertions
      expect(screen.getByTestId('mock-nav-item')).toHaveAttribute('data-name', 'Settings')
    })

    test('renders an empty list when items is empty', () => {
      // Declaration
      // Execution
      render(<MenuNavigationList items={[]} />)
      // Assertions
      expect(screen.queryAllByTestId('mock-nav-item')).toHaveLength(0)
    })

  })
  // #endregion

  // #region className passthrough
  describe('className passthrough', () => {

    test('applies custom className to ul', () => {
      // Declaration
      // Execution
      const { container } = render(<MenuNavigationList className='my-list' items={[]} />)
      // Assertions
      expect(container.querySelector('ul')).toHaveClass('my-list')
    })

  })
  // #endregion

})
