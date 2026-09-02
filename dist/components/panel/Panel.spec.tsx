/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Panel } from './Panel'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ButtonSemantics: {
      TRANSPARENT: 'TRANSPARENT',
    },
    Button: ({ children, onClick }: any) =>
      require('react').createElement('button', { 'data-testid': 'mock-button', onClick }, children),
    ShellContainer: ({ children, className, style }: any) =>
      require('react').createElement('div', { 'data-testid': 'mock-shell-container', className, style }, children),
    Title: ({ children, className, level }: any) =>
      require('react').createElement('div', { 'data-testid': 'mock-title', className, 'data-level': level }, children),
    TitleLevels: { H1: 'H1', H2: 'H2', H3: 'H3', H4: 'H4', H5: 'H5', H6: 'H6' },
  }
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) =>
    require('react').createElement('span', { 'data-testid': 'mock-chevron', 'data-icon': String(icon) }),
}))

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faChevronDown: 'faChevronDown',
  faChevronUp: 'faChevronUp',
}))

describe('Panel', () => {

  // #region render
  describe('render', () => {

    test('renders the title', () => {
      // Declaration
      // Execution
      render(<Panel title='My Panel' />)
      // Assertions
      expect(screen.getByTestId('mock-title')).toBeInTheDocument()
    })

    test('renders children when provided', () => {
      // Declaration
      // Execution
      render(
        <Panel title='Panel'>
          <span data-testid='child'>Content</span>
        </Panel>
      )
      // Assertions
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    test('does not render content area when no children', () => {
      // Declaration
      // Execution
      const { container } = render(<Panel title='Empty Panel' />)
      // Assertions
      expect(container.querySelector('.ap-panel__content')).not.toBeInTheDocument()
    })

    test('does not render expand button when expandable=false (default)', () => {
      // Declaration
      // Execution
      render(<Panel title='Panel'><span>Content</span></Panel>)
      // Assertions
      expect(screen.queryByTestId('mock-button')).not.toBeInTheDocument()
    })

    test('renders expand button when expandable=true', () => {
      // Declaration
      // Execution
      render(<Panel title='Panel' expandable><span>Content</span></Panel>)
      // Assertions
      expect(screen.getByTestId('mock-button')).toBeInTheDocument()
    })

  })
  // #endregion

  // #region expand / collapse classes
  describe('expand / collapse classes', () => {

    test('adds expanded class when children exist and not expandable', () => {
      // Declaration
      // Execution
      const { container } = render(<Panel title='Panel'><span>Content</span></Panel>)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toHaveClass('ap-panel--expanded')
    })

    test('adds collapsed class when no children', () => {
      // Declaration
      // Execution
      render(<Panel title='Empty' />)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toHaveClass('ap-panel--collapsed')
    })

    test('adds collapsed class initially when expandable=true and expanded=false', () => {
      // Declaration
      // Execution
      render(<Panel title='Panel' expandable expanded={false}><span>Content</span></Panel>)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toHaveClass('ap-panel--collapsed')
    })

    test('adds expanded class when expandable=true and expanded=true (default)', () => {
      // Declaration
      // Execution
      render(<Panel title='Panel' expandable><span>Content</span></Panel>)
      // Assertions
      expect(screen.getByTestId('mock-shell-container')).toHaveClass('ap-panel--expanded')
    })

    test('cleans up expand/collapse class on unmount', () => {
      // Declaration
      const { unmount } = render(<Panel title='Panel'><span>Content</span></Panel>)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region expand / collapse toggle
  describe('expand / collapse toggle', () => {

    test('shows chevron-up icon when expanded', () => {
      // Declaration
      // Execution
      render(<Panel title='Panel' expandable><span>Content</span></Panel>)
      // Assertions
      expect(screen.getByTestId('mock-chevron')).toHaveAttribute('data-icon', 'faChevronUp')
    })

    test('shows chevron-down icon when collapsed (expanded=false)', () => {
      // Declaration
      // Execution
      render(<Panel title='Panel' expandable expanded={false}><span>Content</span></Panel>)
      // Assertions
      expect(screen.getByTestId('mock-chevron')).toHaveAttribute('data-icon', 'faChevronDown')
    })

    test('clicking expand button collapses the panel', () => {
      // Declaration
      // Execution
      render(<Panel title='Panel' expandable><span>Content</span></Panel>)
      const button = screen.getByTestId('mock-button')
      // Mock getBoundingClientRect on the content div
      const panelContent = document.querySelector('.ap-panel__content') as HTMLDivElement
      if (panelContent) {
        jest.spyOn(panelContent, 'getBoundingClientRect').mockReturnValue({
          height: 200, width: 0, x: 0, y: 0, bottom: 0, left: 0, right: 0, top: 0, toJSON: () => {}
        } as DOMRect)
      }
      act(() => {
        fireEvent.click(button)
      })
      // Assertions — chevron changes to down
      expect(screen.getByTestId('mock-chevron')).toHaveAttribute('data-icon', 'faChevronDown')
    })

    test('clicking expand button twice expands the panel again', () => {
      // Declaration
      jest.useFakeTimers()
      render(<Panel title='Panel' expandable><span>Content</span></Panel>)
      const button = screen.getByTestId('mock-button')
      const panelContent = document.querySelector('.ap-panel__content') as HTMLDivElement
      if (panelContent) {
        jest.spyOn(panelContent, 'getBoundingClientRect').mockReturnValue({
          height: 200, width: 0, x: 0, y: 0, bottom: 0, left: 0, right: 0, top: 0, toJSON: () => {}
        } as DOMRect)
      }
      act(() => { fireEvent.click(button) }) // collapse
      act(() => { jest.runAllTimers() }) // run the setTimeout
      // Execution
      act(() => { fireEvent.click(button) }) // expand
      // Assertions
      expect(screen.getByTestId('mock-chevron')).toHaveAttribute('data-icon', 'faChevronUp')
      jest.useRealTimers()
    })

    test('setTimeout callback handles null content.current gracefully (unmount before timeout)', () => {
      // Declaration
      jest.useFakeTimers()
      const { unmount } = render(<Panel title='Panel' expandable><span>Content</span></Panel>)
      const button = screen.getByTestId('mock-button')
      const panelContent = document.querySelector('.ap-panel__content') as HTMLDivElement
      if (panelContent) {
        jest.spyOn(panelContent, 'getBoundingClientRect').mockReturnValue({
          height: 200, width: 0, x: 0, y: 0, bottom: 0, left: 0, right: 0, top: 0, toJSON: () => {}
        } as DOMRect)
      }
      // click to collapse (schedules setTimeout)
      act(() => { fireEvent.click(button) })
      // unmount before timeout fires
      unmount()
      // now run the timer — content.current is null since component unmounted
      act(() => { jest.runAllTimers() })
      // Assertions — no error thrown
      jest.useRealTimers()
      expect(true).toBe(true)
    })

  })
  // #region handleExpandClick null guard
  describe('handleExpandClick — null content ref', () => {

    test('does not throw when expand button is clicked with no children (content ref is null)', () => {
      // Declaration — expandable with no children: button renders but content div does not
      // Execution
      render(<Panel title='No Children' expandable />)
      const button = screen.getByTestId('mock-button')
      // Assertions — clicking should not throw even though content.current is null
      expect(() => fireEvent.click(button)).not.toThrow()
    })

  })
  // #endregion

})
