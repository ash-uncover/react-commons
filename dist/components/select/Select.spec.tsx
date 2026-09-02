/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Select, SelectValue } from './Select'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ICONS: {
      FAS_CHEVRON_LEFT: ['fas', 'chevron-left'],
      FAS_CHEVRON_RIGHT: ['fas', 'chevron-right'],
    },
    Button: ({ children, disabled, onClick }: any) =>
      require('react').createElement('button', { 'data-testid': 'mock-button', disabled, onClick }, children),
  }
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) =>
    require('react').createElement('span', { 'data-testid': 'mock-icon', 'data-icon': String(icon) }),
}))

const VALUES: SelectValue[] = [
  { id: 'a', text: 'Apple' },
  { id: 'b', text: 'Banana' },
  { id: 'c', text: 'Cherry' },
]

describe('Select', () => {

  // #region render
  describe('render', () => {

    test('renders two buttons (prev/next)', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      render(<Select value='a' values={VALUES} onChange={onChange} />)
      // Assertions
      expect(screen.getAllByTestId('mock-button')).toHaveLength(2)
    })

    test('displays the text of the selected value', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Select value='b' values={VALUES} onChange={onChange} />)
      // Assertions
      expect(container.querySelector('.ap-select__value')).toHaveTextContent('Banana')
    })

    test('displays null text when value is not in values list', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Select value='z' values={VALUES} onChange={onChange} />)
      // Assertions
      expect(container.querySelector('.ap-select__value')).toBeEmptyDOMElement()
    })

    test('disables buttons when disabled=true', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      render(<Select disabled value='a' values={VALUES} onChange={onChange} />)
      // Assertions
      const buttons = screen.getAllByTestId('mock-button')
      expect(buttons[0]).toBeDisabled()
      expect(buttons[1]).toBeDisabled()
    })

  })
  // #endregion

  // #region disabled modifier
  describe('disabled modifier', () => {

    test('adds disabled class when disabled=true', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Select disabled value='a' values={VALUES} onChange={onChange} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-select--disabled')
    })

    test('does not add disabled class when disabled is falsy', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Select value='a' values={VALUES} onChange={onChange} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-select--disabled')
    })

    test('removes disabled class when disabled changes from true to false', () => {
      // Declaration
      const onChange = jest.fn()
      const { container, rerender } = render(<Select disabled value='a' values={VALUES} onChange={onChange} />)
      // Execution
      rerender(<Select value='a' values={VALUES} onChange={onChange} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-select--disabled')
    })

    test('cleans up disabled class on unmount', () => {
      // Declaration
      const onChange = jest.fn()
      const { unmount } = render(<Select disabled value='a' values={VALUES} onChange={onChange} />)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region previous value
  describe('previous value navigation', () => {

    test('calls onChange with previous value when prev button is clicked', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Select value='b' values={VALUES} onChange={onChange} />)
      const [prevBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(prevBtn)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 'a' })
    })

    test('wraps around to last value when at first value', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Select value='a' values={VALUES} onChange={onChange} />)
      const [prevBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(prevBtn)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 'c' })
    })

    test('does not call onChange for prev when values is empty', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Select value='' values={[]} onChange={onChange} />)
      const [prevBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(prevBtn)
      // Assertions
      expect(onChange).not.toHaveBeenCalled()
    })

    test('does not call onChange for prev when value is set but values is empty', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Select value='a' values={[]} onChange={onChange} />)
      const [prevBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(prevBtn)
      // Assertions
      expect(onChange).not.toHaveBeenCalled()
    })

    test('does not call onChange for prev when value is empty string', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Select value='' values={VALUES} onChange={onChange} />)
      const [prevBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(prevBtn)
      // Assertions
      expect(onChange).not.toHaveBeenCalled()
    })

  })
  // #endregion

  // #region next value
  describe('next value navigation', () => {

    test('calls onChange with next value when next button is clicked', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Select value='a' values={VALUES} onChange={onChange} />)
      const [, nextBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(nextBtn)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 'b' })
    })

    test('wraps around to first value when at last value', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Select value='c' values={VALUES} onChange={onChange} />)
      const [, nextBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(nextBtn)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 'a' })
    })

    test('does not call onChange for next when values is empty', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Select value='' values={[]} onChange={onChange} />)
      const [, nextBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(nextBtn)
      // Assertions
      expect(onChange).not.toHaveBeenCalled()
    })

    test('does not call onChange for next when value is set but values is empty', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Select value='a' values={[]} onChange={onChange} />)
      const [, nextBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(nextBtn)
      // Assertions
      expect(onChange).not.toHaveBeenCalled()
    })

  })
  // #endregion

  // #region value change from outside
  describe('value updated from outside', () => {

    test('updates displayed text when value prop changes', () => {
      // Declaration
      const onChange = jest.fn()
      const { container, rerender } = render(<Select value='a' values={VALUES} onChange={onChange} />)
      // Execution
      rerender(<Select value='c' values={VALUES} onChange={onChange} />)
      // Assertions
      expect(container.querySelector('.ap-select__value')).toHaveTextContent('Cherry')
    })

  })
  // #endregion

})
