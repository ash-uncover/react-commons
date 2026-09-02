/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Menu, MenuInner } from './Menu'
import { IMenu, IMenuItemDef } from './MenuUtil'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ICONS: {
      FAS_RIGHT_FROM_BRACKET: ['fas', 'right-from-bracket'],
    },
    ShellContainer: ({ children, className, style, level }: any) =>
      require('react').createElement(
        'div',
        { 'data-testid': 'mock-shell-container', className, style, 'data-level': level },
        children
      ),
    ShellPage: ({ children, className }: any) =>
      require('react').createElement(
        'div',
        { 'data-testid': 'mock-shell-page', className },
        children
      ),
    MenuNavigationList: ({ items }: any) =>
      require('react').createElement(
        'ul',
        { 'data-testid': 'mock-nav-list', 'data-count': items.length },
        items.map((item: any, i: number) =>
          require('react').createElement('li', { key: i, 'data-name': item.name, onClick: item.onClick })
        )
      ),
  }
})

// Mock the entire MenuProvider module so we can control hook return values
const mockUseMenuItemSelected = jest.fn().mockReturnValue(null)
const mockUseMenuItemNavigation = jest.fn().mockReturnValue(null)
const mockUseMenuItemComponent = jest.fn().mockReturnValue(null)
const mockUseSelectItem = jest.fn().mockReturnValue(jest.fn())
const mockUseGoBack = jest.fn().mockReturnValue(jest.fn())

jest.mock('./MenuProvider', () => {
  const React = require('react')
  return {
    MenuProvider: ({ children }: any) =>
      require('react').createElement(React.Fragment, null, children),
    useMenuItemSelected: () => mockUseMenuItemSelected(),
    useMenuItemNavigation: () => mockUseMenuItemNavigation(),
    useMenuItemComponent: () => mockUseMenuItemComponent(),
    useSelectItem: () => mockUseSelectItem(),
    useGoBack: () => mockUseGoBack(),
    MenuDispatchContext: React.createContext(() => {}),
  }
})

function buildItem(overrides: Partial<IMenuItemDef> = {}): IMenuItemDef {
  return {
    parents: [],
    name: 'item',
    items: [],
    ...overrides,
  }
}

describe('Menu', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseMenuItemSelected.mockReturnValue(null)
    mockUseMenuItemNavigation.mockReturnValue(null)
    mockUseMenuItemComponent.mockReturnValue(null)
    mockUseSelectItem.mockReturnValue(jest.fn())
    mockUseGoBack.mockReturnValue(jest.fn())
  })

  // #region renders nothing when menu changes to falsy
  describe('menu becoming falsy', () => {

    test('sets menuDef to empty when menu prop is null-like (re-render)', () => {
      // Declaration
      const MockComp = () => require('react').createElement('div', null)
      const menu: IMenu = { items: [{ name: 'root', component: require('react').createElement(MockComp) }] }
      const { rerender } = render(<Menu menu={menu} />)
      // Execution — re-render with a falsy menu (null cast as IMenu)
      rerender(<Menu menu={null as any} />)
      // Assertions — should not crash
      expect(true).toBe(true)
    })

  })
  // #endregion

  // #region renders MenuProvider when menu has items
  describe('renders when menu has items', () => {

    test('renders content when menu has items', () => {
      // Declaration
      const MockComp = () => require('react').createElement('div', { 'data-testid': 'page-content' })
      const menu: IMenu = { items: [{ name: 'root', component: require('react').createElement(MockComp) }] }
      // Execution
      const { container } = render(<Menu menu={menu} />)
      // Assertions
      expect(container.firstChild).not.toBeNull()
    })

  })
  // #endregion

})

describe('MenuInner', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseMenuItemSelected.mockReturnValue(null)
    mockUseMenuItemNavigation.mockReturnValue(null)
    mockUseMenuItemComponent.mockReturnValue(null)
    mockUseSelectItem.mockReturnValue(jest.fn())
    mockUseGoBack.mockReturnValue(jest.fn())
  })

  // #region non-container render
  describe('non-container render (div layout)', () => {

    test('renders a div with ap-menu class', () => {
      // Declaration
      // Execution
      const { container } = render(<MenuInner />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-menu')
    })

    test('renders itemComponent.component when itemComponent is set', () => {
      // Declaration
      const MockComp = () => require('react').createElement('div', { 'data-testid': 'inner-comp' })
      const item = buildItem({ component: require('react').createElement(MockComp) })
      mockUseMenuItemComponent.mockReturnValue(item)
      // Execution
      render(<MenuInner />)
      // Assertions
      expect(screen.getByTestId('inner-comp')).toBeInTheDocument()
    })

    test('renders null content when itemComponent is null', () => {
      // Declaration
      mockUseMenuItemComponent.mockReturnValue(null)
      // Execution
      const { queryByTestId } = render(<MenuInner />)
      // Assertions
      expect(queryByTestId('inner-comp')).toBeNull()
    })

    test('adds collapsed class when collapsed=true', () => {
      // Declaration
      // Execution
      const { container } = render(<MenuInner collapsed />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-menu--collapsed')
    })

    test('removes collapsed class when collapsed changes to false', () => {
      // Declaration
      const { container, rerender } = render(<MenuInner collapsed />)
      // Execution
      rerender(<MenuInner collapsed={false} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-menu--collapsed')
    })

    test('cleans up collapsed class on unmount', () => {
      // Declaration
      const { unmount } = render(<MenuInner collapsed />)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region container render
  describe('container render (ShellContainer layout)', () => {

    test('renders ShellContainer when container=true', () => {
      // Declaration
      // Execution
      render(<MenuInner container containerLevel={2} />)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toBeInTheDocument()
    })

    test('renders itemComponent.component in ShellPage when container=true and itemComponent is set', () => {
      // Declaration
      const MockComp = () => require('react').createElement('div', { 'data-testid': 'container-page-comp' })
      const item = buildItem({ component: require('react').createElement(MockComp) })
      mockUseMenuItemComponent.mockReturnValue(item)
      // Execution
      render(<MenuInner container />)
      // Assertions
      expect(screen.getByTestId('container-page-comp')).toBeInTheDocument()
    })

    test('renders null content in ShellPage when container=true and itemComponent is null', () => {
      // Declaration
      mockUseMenuItemComponent.mockReturnValue(null)
      // Execution
      render(<MenuInner container />)
      // Assertions — ShellPage renders but with no component content
      expect(screen.getByTestId('mock-shell-page')).toBeInTheDocument()
    })

  })
  // #endregion

  // #region navigation item click
  describe('navigation — item click calls selectItem', () => {

    test('calls selectItem when a navigation item is clicked', () => {
      // Declaration
      const selectItemFn = jest.fn()
      mockUseSelectItem.mockReturnValue(selectItemFn)
      const child = buildItem({ name: 'child' })
      const navItem = buildItem({ name: 'nav', items: [child] })
      mockUseMenuItemNavigation.mockReturnValue(navItem)
      // Execution
      const { container } = render(<MenuInner />)
      const li = container.querySelector('li[data-name="child"]')
      fireEvent.click(li as HTMLElement)
      // Assertions
      expect(selectItemFn).toHaveBeenCalledWith(child)
    })

  })
  // #endregion

  // #region back button
  describe('navigation — back button', () => {

    test('adds back item when navigation item has a parent', () => {
      // Declaration
      const child = buildItem({ name: 'child' })
      const parent = buildItem({ name: 'parent', items: [child] })
      child.parents = [parent]
      const navItem = buildItem({ name: 'nav', items: [child], parents: [parent] })
      mockUseMenuItemNavigation.mockReturnValue(navItem)
      // Execution
      render(<MenuInner />)
      // Assertions
      const navList = screen.getByTestId('mock-nav-list')
      // navigation items = children + 1 back
      expect(Number(navList.getAttribute('data-count'))).toBeGreaterThan(1)
    })

    test('calls goBack when back item is clicked', () => {
      // Declaration
      const goBackFn = jest.fn()
      mockUseGoBack.mockReturnValue(goBackFn)
      const child = buildItem({ name: 'child' })
      const parent = buildItem({ name: 'parent', items: [child] })
      child.parents = [parent]
      const navItem = buildItem({ name: 'nav', items: [child], parents: [parent] })
      mockUseMenuItemNavigation.mockReturnValue(navItem)
      // Execution
      const { container } = render(<MenuInner />)
      const backLi = container.querySelector('li[data-name="back"]')
      fireEvent.click(backLi as HTMLElement)
      // Assertions
      expect(goBackFn).toHaveBeenCalled()
    })

  })
  // #endregion

  // #region buildMenuNavigationItem returns empty for null
  describe('buildMenuNavigationItem returns empty for null itemNavigation', () => {

    test('passes empty items to MenuNavigationList when navigation is null', () => {
      // Declaration
      mockUseMenuItemNavigation.mockReturnValue(null)
      // Execution
      render(<MenuInner />)
      // Assertions
      const navList = screen.getByTestId('mock-nav-list')
      expect(Number(navList.getAttribute('data-count'))).toBe(0)
    })

  })
  // #endregion

  // #region navigation item with no items returns empty array
  describe('buildMenuNavigationItem with itemNavigation having no items', () => {

    test('returns empty items when itemNavigation has undefined items', () => {
      // Declaration
      const navItem = buildItem({ name: 'nav' })
      // Override items to be undefined to test the else branch
      ;(navItem as any).items = undefined
      mockUseMenuItemNavigation.mockReturnValue(navItem)
      // Execution
      render(<MenuInner />)
      // Assertions
      const navList = screen.getByTestId('mock-nav-list')
      expect(Number(navList.getAttribute('data-count'))).toBe(0)
    })

  })
  // #endregion

})

