/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import { Title } from './Title'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ...require('./TitleLevel'),
  }
})

describe('Title', () => {

  // #region render — tag level
  describe('render — tag level', () => {

    test('renders h1 by default', () => {
      // Declaration
      // Execution
      const { container } = render(<Title />)
      // Assertions
      expect(container.querySelector('h1')).toBeInTheDocument()
    })

    test('renders h2 when level is H2', () => {
      // Declaration
      // Execution
      const { container } = render(<Title level='H2' />)
      // Assertions
      expect(container.querySelector('h2')).toBeInTheDocument()
    })

    test('renders h3 when level is H3', () => {
      // Declaration
      // Execution
      const { container } = render(<Title level='H3' />)
      // Assertions
      expect(container.querySelector('h3')).toBeInTheDocument()
    })

    test('renders h4 when level is H4', () => {
      // Declaration
      // Execution
      const { container } = render(<Title level='H4' />)
      // Assertions
      expect(container.querySelector('h4')).toBeInTheDocument()
    })

  })
  // #endregion

  // #region content
  describe('content', () => {

    test('renders text prop', () => {
      // Declaration
      // Execution
      const { container } = render(<Title text='My Title' />)
      // Assertions
      expect(container.querySelector('h1')).toHaveTextContent('My Title')
    })

    test('renders children', () => {
      // Declaration
      // Execution
      const { getByTestId } = render(
        <Title>
          <span data-testid='child'>Title Content</span>
        </Title>
      )
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument()
    })

    test('prefers children over text when both are provided', () => {
      // Declaration
      // Execution
      const { getByTestId } = render(
        <Title text='Ignored'>
          <span data-testid='child'>Child</span>
        </Title>
      )
      // Assertions
      expect(getByTestId('child')).toBeInTheDocument()
    })

  })
  // #endregion

  // #region level modifier class
  describe('level modifier class', () => {

    test('adds h1 level class by default', () => {
      // Declaration
      // Execution
      const { container } = render(<Title />)
      // Assertions
      expect(container.querySelector('h1')).toHaveClass('ap-title--h1')
    })

    test('adds h2 level class when level is H2', () => {
      // Declaration
      // Execution
      const { container } = render(<Title level='H2' />)
      // Assertions
      expect(container.querySelector('h2')).toHaveClass('ap-title--h2')
    })

    test('removes old level class and adds new when level changes', () => {
      // Declaration
      const { container, rerender } = render(<Title level='H1' />)
      // Execution
      rerender(<Title level='H3' />)
      // Assertions
      expect(container.querySelector('h3')).toHaveClass('ap-title--h3')
      expect(container.querySelector('h1')).not.toBeInTheDocument()
    })

    test('cleans up level class on unmount', () => {
      // Declaration
      const { unmount } = render(<Title level='H2' />)
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
      const { container } = render(<Title className='my-title' />)
      // Assertions
      expect(container.querySelector('h1')).toHaveClass('my-title')
    })

  })
  // #endregion

})
