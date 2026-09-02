/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TextArea } from './TextArea'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
  }
})

describe('TextArea', () => {

  // #region render
  describe('render', () => {

    test('renders a textarea element', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<TextArea onChange={onChange} />)
      // Assertions
      expect(container.querySelector('textarea')).toBeInTheDocument()
    })

    test('passes name prop to textarea', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<TextArea name='bio' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('textarea')).toHaveAttribute('name', 'bio')
    })

    test('passes placeholder prop to textarea', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<TextArea placeholder='Enter bio' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('textarea')).toHaveAttribute('placeholder', 'Enter bio')
    })

    test('passes disabled prop to textarea', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<TextArea disabled onChange={onChange} />)
      // Assertions
      expect(container.querySelector('textarea')).toBeDisabled()
    })

    test('passes rows prop to textarea', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<TextArea rows={5} onChange={onChange} />)
      // Assertions
      expect(container.querySelector('textarea')).toHaveAttribute('rows', '5')
    })

    test('passes value prop to textarea', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<TextArea value='hello' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('textarea')).toHaveValue('hello')
    })

    test('applies custom className', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<TextArea className='my-area' onChange={onChange} />)
      // Assertions
      expect(container.firstChild).toHaveClass('my-area')
    })

  })
  // #endregion

  // #region onChange
  describe('onChange', () => {

    test('calls onChange with new value when textarea changes', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<TextArea value='old' onChange={onChange} />)
      // Execution
      fireEvent.change(container.querySelector('textarea') as HTMLTextAreaElement, {
        target: { value: 'new value' }
      })
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 'new value' })
    })

  })
  // #endregion

  // #region focus / blur
  describe('focus and blur', () => {

    test('sets tabIndex to -1 on wrapper div when focused', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<TextArea onChange={onChange} />)
      const wrapper = container.firstChild as HTMLElement
      // Execution
      fireEvent.focus(wrapper)
      // Assertions
      expect(wrapper).toHaveAttribute('tabindex', '-1')
    })

    test('sets tabIndex back to 0 on blur', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<TextArea onChange={onChange} />)
      const wrapper = container.firstChild as HTMLElement
      fireEvent.focus(wrapper)
      // Execution
      fireEvent.blur(container.querySelector('textarea') as HTMLTextAreaElement)
      // Assertions
      expect(wrapper).toHaveAttribute('tabindex', '0')
    })

    test('calls focus() on the textarea when wrapper is focused', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<TextArea onChange={onChange} />)
      const wrapper = container.firstChild as HTMLElement
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement
      const focusSpy = jest.spyOn(textarea, 'focus')
      // Execution
      fireEvent.focus(wrapper)
      // Assertions
      expect(focusSpy).toHaveBeenCalled()
    })

  })
  // #endregion

})
