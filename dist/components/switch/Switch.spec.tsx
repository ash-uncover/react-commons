/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Switch } from './Switch'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
  }
})

describe('Switch', () => {

  // #region render
  describe('render', () => {

    test('renders a checkbox input', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Switch checked={false} label='Toggle' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument()
    })

    test('renders a label element', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Switch checked={false} label='Toggle' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('label')).toBeInTheDocument()
    })

    test('renders label text', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Switch checked={false} label='Dark mode' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('label')).toHaveTextContent('Dark mode')
    })

    test('sets checked on the input', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Switch checked={true} label='Toggle' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input[type="checkbox"]')).toBeChecked()
    })

    test('input and label share the same id (htmlFor)', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Switch checked={false} label='Toggle' onChange={onChange} />)
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
      const label = container.querySelector('label') as HTMLLabelElement
      // Assertions
      expect(label).toHaveAttribute('for', input.id)
    })

    test('sets name attribute to label value', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Switch checked={false} label='my-switch' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input[type="checkbox"]')).toHaveAttribute('name', 'my-switch')
    })

    test('applies custom className', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Switch className='extra' checked={false} label='Toggle' onChange={onChange} />)
      // Assertions
      expect(container.firstChild).toHaveClass('extra')
    })

  })
  // #endregion

  // #region onChange
  describe('onChange', () => {

    test('calls onChange with true when checkbox is checked via click', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Switch checked={false} label='Toggle' onChange={onChange} />)
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
      // Execution — fireEvent.click toggles the checked value and fires onChange
      fireEvent.click(input)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: true })
    })

    test('calls onChange with false when checked checkbox is clicked', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Switch checked={true} label='Toggle' onChange={onChange} />)
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
      // Execution
      fireEvent.click(input)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: false })
    })

  })
  // #endregion

})
