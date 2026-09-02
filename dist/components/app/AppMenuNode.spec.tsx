/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppMenuNode } from './AppMenuNode'
import { AppNodeDef } from './AppNodeDef'

const mockNavigate = jest.fn()
const mockPathname = { value: '/' }

jest.mock('react-router', () => ({
  useLocation: () => ({ pathname: mockPathname.value }),
  useNavigate: () => mockNavigate,
}))

jest.mock('./AppMenuItem', () => ({
  AppMenuItem: ({
    name,
    active,
    group,
    depth,
    onClick,
  }: {
    name?: string
    active?: boolean
    group?: boolean
    depth?: number
    onClick: () => void
  }) =>
    require('react').createElement('div', {
      'data-testid': 'mock-app-menu-item',
      'data-name': name,
      'data-active': String(active),
      'data-group': String(group),
      'data-depth': String(depth),
      onClick,
    }),
}))

const buildDef = (overrides: Partial<AppNodeDef> = {}): AppNodeDef => ({
  name: 'Test',
  path: '/test',
  parents: [],
  items: [],
  ...overrides,
})

describe('AppMenuNode', () => {

  beforeEach(() => {
    mockNavigate.mockClear()
    mockPathname.value = '/'
  })

  // #region leaf node
  describe('leaf node (no items)', () => {

    test('renders AppMenuItem', () => {
      // Declaration
      const def = buildDef()
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getByTestId('mock-app-menu-item')).toBeInTheDocument()
    })

    test('passes name to AppMenuItem', () => {
      // Declaration
      const def = buildDef({ name: 'Avatar' })
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getByTestId('mock-app-menu-item')).toHaveAttribute('data-name', 'Avatar')
    })

    test('is active when pathname matches path exactly', () => {
      // Declaration
      mockPathname.value = '/components/avatar'
      const def = buildDef({ path: '/components/avatar' })
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getByTestId('mock-app-menu-item')).toHaveAttribute('data-active', 'true')
    })

    test('is not active when pathname does not match', () => {
      // Declaration
      mockPathname.value = '/components/button'
      const def = buildDef({ path: '/components/avatar' })
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getByTestId('mock-app-menu-item')).toHaveAttribute('data-active', 'false')
    })

    test('derives depth 0 from single parent (the root)', () => {
      // Declaration
      const rootDef = buildDef({ path: '/' })
      const def = buildDef({ path: '/test', parents: [rootDef] })
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getByTestId('mock-app-menu-item')).toHaveAttribute('data-depth', '0')
    })

    test('navigates to own path on click when no items', () => {
      // Declaration
      const def = buildDef({ path: '/components/avatar' })
      render(<AppMenuNode def={def} />)
      // Execution
      fireEvent.click(screen.getByTestId('mock-app-menu-item'))
      // Assertions
      expect(mockNavigate).toHaveBeenCalledWith('/components/avatar')
    })

    test('navigates to own path on click when component is present', () => {
      // Declaration
      const def = buildDef({ path: '/components/avatar', component: () => null })
      render(<AppMenuNode def={def} />)
      // Execution
      fireEvent.click(screen.getByTestId('mock-app-menu-item'))
      // Assertions
      expect(mockNavigate).toHaveBeenCalledWith('/components/avatar')
    })

  })
  // #endregion

  // #region group node
  describe('group node (has items)', () => {

    test('renders AppMenuItem with group flag', () => {
      // Declaration
      const child = buildDef({ path: '/section/page' })
      const def = buildDef({ path: '/section', items: [child] })
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getAllByTestId('mock-app-menu-item')[0]).toHaveAttribute('data-group', 'true')
    })

    test('renders child nodes', () => {
      // Declaration
      const child = buildDef({ name: 'Child', path: '/section/child' })
      const def = buildDef({ path: '/section', items: [child] })
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getAllByTestId('mock-app-menu-item')).toHaveLength(2)
    })

    test('group header is active ancestor when pathname starts with path/', () => {
      // Declaration
      mockPathname.value = '/section/page'
      const child = buildDef({ path: '/section/page' })
      const def = buildDef({ path: '/section', items: [child] })
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getAllByTestId('mock-app-menu-item')[0]).toHaveAttribute('data-active', 'true')
    })

    test('active ancestor check handles root path correctly', () => {
      // Declaration
      mockPathname.value = '/page'
      const child = buildDef({ path: '/page' })
      const def = buildDef({ path: '/', items: [child] })
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getAllByTestId('mock-app-menu-item')[0]).toHaveAttribute('data-active', 'true')
    })

    test('group header is not active when pathname is unrelated', () => {
      // Declaration
      mockPathname.value = '/other'
      const child = buildDef({ path: '/section/page' })
      const def = buildDef({ path: '/section', items: [child] })
      // Execution
      render(<AppMenuNode def={def} />)
      // Assertions
      expect(screen.getAllByTestId('mock-app-menu-item')[0]).toHaveAttribute('data-active', 'false')
    })

    test('navigates to first child path on click when group has no component', () => {
      // Declaration
      const child = buildDef({ path: '/section/page' })
      const def = buildDef({ path: '/section', items: [child] })
      render(<AppMenuNode def={def} />)
      // Execution
      fireEvent.click(screen.getAllByTestId('mock-app-menu-item')[0])
      // Assertions
      expect(mockNavigate).toHaveBeenCalledWith('/section/page')
    })

    test('navigates to own path on click when group has a component', () => {
      // Declaration
      const child = buildDef({ path: '/section/page' })
      const def = buildDef({ path: '/section', component: () => null, items: [child] })
      render(<AppMenuNode def={def} />)
      // Execution
      fireEvent.click(screen.getAllByTestId('mock-app-menu-item')[0])
      // Assertions
      expect(mockNavigate).toHaveBeenCalledWith('/section')
    })

  })
  // #endregion

})
