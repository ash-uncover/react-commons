import React from 'react'
import { render, act } from '@testing-library/react'
import { Carousel, getClassName } from './Carousel'

jest.mock('../..', () => {
  const { usePrevious } = require('../../hooks/usePrevious')
  return {
    __esModule: true,
    usePrevious,
  }
})

describe('Carousel', () => {

  // #region getClassName
  describe('getClassName', () => {

    test('returns base class when no className provided', () => {
      // Declaration
      // Execution
      // Assertions
      expect(getClassName()).toBe('carousel')
    })

    test('appends extra className', () => {
      // Declaration
      // Execution
      // Assertions
      expect(getClassName('my-class')).toBe('carousel my-class')
    })

  })
  // #endregion

  // #region render
  describe('render', () => {

    test('renders a div with carousel class', () => {
      // Declaration
      // Execution
      const { container } = render(<Carousel />)
      // Assertions
      expect(container.firstChild).toHaveClass('carousel')
    })

    test('applies custom className', () => {
      // Declaration
      // Execution
      const { container } = render(<Carousel className='custom' />)
      // Assertions
      expect(container.firstChild).toHaveClass('custom')
    })

    test('renders children in the current slide', () => {
      // Declaration
      // Execution
      const { container } = render(<Carousel><span>content</span></Carousel>)
      // Assertions
      expect(container.querySelector('.carousel-current')).toHaveTextContent('content')
    })

    test('renders the previous slide container', () => {
      // Declaration
      // Execution
      const { container } = render(<Carousel />)
      // Assertions
      expect(container.querySelector('.carousel-previous')).toBeInTheDocument()
    })

    test('moves previous children to the previous slide on rerender', () => {
      // Declaration
      const { container, rerender } = render(<Carousel><span>first</span></Carousel>)
      // Execution
      rerender(<Carousel><span>second</span></Carousel>)
      // Assertions
      expect(container.querySelector('.carousel-current')).toHaveTextContent('second')
      expect(container.querySelector('.carousel-previous')).toHaveTextContent('first')
    })

  })
  // #endregion

  // #region prepare class
  describe('prepare class', () => {

    afterEach(() => {
      jest.useRealTimers()
    })

    test('adds prepare class to container when children change', () => {
      // Declaration
      const { container, rerender } = render(<Carousel><span>first</span></Carousel>)
      // Execution
      rerender(<Carousel><span>second</span></Carousel>)
      // Assertions
      expect(container.firstChild).toHaveClass('prepare')
    })

    test('removes prepare class after timeout fires', () => {
      // Declaration
      jest.useFakeTimers()
      const { container, rerender } = render(<Carousel><span>first</span></Carousel>)
      // Execution
      rerender(<Carousel><span>second</span></Carousel>)
      act(() => { jest.runAllTimers() })
      // Assertions
      expect(container.firstChild).not.toHaveClass('prepare')
    })

    test('cleanClass is a no-op when component unmounts before timer fires', () => {
      // Declaration
      jest.useFakeTimers()
      const { rerender, unmount } = render(<Carousel><span>first</span></Carousel>)
      rerender(<Carousel><span>second</span></Carousel>)
      // Execution
      unmount()
      // Assertions — no error when timer fires after unmount
      expect(() => act(() => { jest.runAllTimers() })).not.toThrow()
    })

  })
  // #endregion

})
