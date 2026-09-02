/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { AppMenu } from './AppMenu'
import { AppNode } from './AppNode'
import { AppNodeDef } from './AppNodeDef'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return { __esModule: true, useClasses, useClasseName }
})

jest.mock('./AppMenuNode', () => ({
  AppMenuNode: ({ def }: { def: AppNodeDef }) =>
    require('react').createElement('div', {
      'data-testid': 'mock-app-menu-node',
      'data-path': def.path,
    }),
}))

const mockResolveApp = jest.fn()

jest.mock('./AppUtils', () => ({
  resolveApp: (node: AppNode) => mockResolveApp(node),
}))

const buildNodeDef = (path: string, items: AppNodeDef[] = []): AppNodeDef => ({
  name: path,
  path,
  parents: [],
  items,
})

const ROOT_NODE: AppNode = { name: 'App', path: '/' }

describe('AppMenu', () => {

  beforeEach(() => {
    mockResolveApp.mockClear()
  })

  // #region render
  describe('render', () => {

    test('returns null when resolveApp returns an empty list', () => {
      // Declaration
      mockResolveApp.mockReturnValue([])
      // Execution
      const { container } = render(<AppMenu node={ROOT_NODE} />)
      // Assertions
      expect(container.firstChild).toBeNull()
    })

    test('renders one AppMenuNode per root child', () => {
      // Declaration
      const childA = buildNodeDef('/a')
      const childB = buildNodeDef('/b')
      const rootDef = buildNodeDef('/', [childA, childB])
      mockResolveApp.mockReturnValue([rootDef, childA, childB])
      // Execution
      render(<AppMenu node={ROOT_NODE} />)
      // Assertions
      expect(screen.getAllByTestId('mock-app-menu-node')).toHaveLength(2)
    })

    test('passes the correct def to each AppMenuNode', () => {
      // Declaration
      const child = buildNodeDef('/components')
      const rootDef = buildNodeDef('/', [child])
      mockResolveApp.mockReturnValue([rootDef, child])
      // Execution
      render(<AppMenu node={ROOT_NODE} />)
      // Assertions
      expect(screen.getByTestId('mock-app-menu-node')).toHaveAttribute('data-path', '/components')
    })

    test('calls resolveApp with the provided node', () => {
      // Declaration
      const rootDef = buildNodeDef('/')
      mockResolveApp.mockReturnValue([rootDef])
      // Execution
      render(<AppMenu node={ROOT_NODE} />)
      // Assertions
      expect(mockResolveApp).toHaveBeenCalledWith(ROOT_NODE)
    })

  })
  // #endregion

})
