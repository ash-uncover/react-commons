/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Input } from './Input'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
  }
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className, onMouseDown, onMouseLeave, onMouseUp, onClick }: any) =>
    require('react').createElement('span', {
      'data-testid': 'mock-fa-icon',
      className,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onClick,
    }),
}))

jest.mock('@fortawesome/free-solid-svg-icons', () => ({ faRemove: 'faRemove' }))
jest.mock('@fortawesome/free-regular-svg-icons', () => ({ faEye: 'faEye' }))

describe('Input', () => {

  // #region render
  describe('render', () => {

    test('renders an input element', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Input onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input')).toBeInTheDocument()
    })

    test('passes name to input', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Input name='username' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input')).toHaveAttribute('name', 'username')
    })

    test('passes placeholder to input', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Input placeholder='Enter text' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input')).toHaveAttribute('placeholder', 'Enter text')
    })

    test('passes disabled to input', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Input disabled onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input')).toBeDisabled()
    })

    test('passes value to input', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Input value='hello' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input')).toHaveValue('hello')
    })

    test('renders type=password on the input', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Input type='password' value='secret' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input')).toHaveAttribute('type', 'password')
    })

  })
  // #endregion

  // #region onChange
  describe('onChange', () => {

    test('calls onChange with new value when input changes', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Input value='old' onChange={onChange} />)
      // Execution
      fireEvent.change(container.querySelector('input') as HTMLInputElement, { target: { value: 'new' } })
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 'new' })
    })

  })
  // #endregion

  // #region focus / blur
  describe('focus and blur', () => {

    test('sets tabIndex to -1 on wrapper div when focused', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Input onChange={onChange} />)
      const wrapper = container.firstChild as HTMLElement
      // Execution
      fireEvent.focus(wrapper)
      // Assertions
      expect(wrapper).toHaveAttribute('tabindex', '-1')
    })

    test('sets tabIndex back to 0 when blurred', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Input onChange={onChange} />)
      const wrapper = container.firstChild as HTMLElement
      fireEvent.focus(wrapper)
      // Execution
      fireEvent.blur(container.querySelector('input') as HTMLInputElement)
      // Assertions
      expect(wrapper).toHaveAttribute('tabindex', '0')
    })

    test('calls select() on focus when autoSelect is true', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Input autoSelect value='hello' onChange={onChange} />)
      const wrapper = container.firstChild as HTMLElement
      const inputEl = container.querySelector('input') as HTMLInputElement
      const selectSpy = jest.spyOn(inputEl, 'select')
      // Execution
      fireEvent.focus(wrapper)
      // Assertions
      expect(selectSpy).toHaveBeenCalled()
    })

    test('calls focus() on focus when autoFocus is true (and autoSelect is false)', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Input autoFocus value='hello' onChange={onChange} />)
      const wrapper = container.firstChild as HTMLElement
      const inputEl = container.querySelector('input') as HTMLInputElement
      const focusSpy = jest.spyOn(inputEl, 'focus')
      // Execution
      fireEvent.focus(wrapper)
      // Assertions
      expect(focusSpy).toHaveBeenCalled()
    })

  })
  // #endregion

  // #region password icon
  describe('password icon', () => {

    test('shows password icon when showPasswordIcon=true, type=password, and value is not empty', () => {
      // Declaration
      const onChange = jest.fn()
      const { getAllByTestId } = render(
        <Input showPasswordIcon type='password' value='secret' onChange={onChange} />
      )
      // Execution + Assertions
      const icons = getAllByTestId('mock-fa-icon')
      expect(icons.some(i => i.classList.contains('ap-input__action-password'))).toBe(true)
    })

    test('does not show password icon when value is empty', () => {
      // Declaration
      const onChange = jest.fn()
      const { queryAllByTestId } = render(
        <Input showPasswordIcon type='password' value='' onChange={onChange} />
      )
      // Execution + Assertions
      const icons = queryAllByTestId('mock-fa-icon')
      expect(icons.every(i => !i.classList.contains('ap-input__action-password'))).toBe(true)
    })

    test('toggles show-password class when password icon is mousedown', () => {
      // Declaration
      const onChange = jest.fn()
      const { container, getAllByTestId } = render(
        <Input showPasswordIcon type='password' value='secret' onChange={onChange} />
      )
      const icon = getAllByTestId('mock-fa-icon').find(i =>
        i.classList.contains('ap-input__action-password')
      )!
      // Execution
      fireEvent.mouseDown(icon)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-input--show-password')
    })

    test('removes show-password class on mouseLeave', () => {
      // Declaration
      const onChange = jest.fn()
      const { container, getAllByTestId } = render(
        <Input showPasswordIcon type='password' value='secret' onChange={onChange} />
      )
      const icon = getAllByTestId('mock-fa-icon').find(i =>
        i.classList.contains('ap-input__action-password')
      )!
      fireEvent.mouseDown(icon) // toggle on
      // Execution
      fireEvent.mouseLeave(icon)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-input--show-password')
    })

    test('removes show-password class on mouseUp', () => {
      // Declaration
      const onChange = jest.fn()
      const { container, getAllByTestId } = render(
        <Input showPasswordIcon type='password' value='secret' onChange={onChange} />
      )
      const icon = getAllByTestId('mock-fa-icon').find(i =>
        i.classList.contains('ap-input__action-password')
      )!
      fireEvent.mouseDown(icon) // toggle on
      // Execution
      fireEvent.mouseUp(icon)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-input--show-password')
    })

    test('passes empty type to input when showPassword is active', () => {
      // Declaration
      const onChange = jest.fn()
      const { container, getAllByTestId } = render(
        <Input showPasswordIcon type='password' value='secret' onChange={onChange} />
      )
      const icon = getAllByTestId('mock-fa-icon').find(i =>
        i.classList.contains('ap-input__action-password')
      )!
      // Execution
      fireEvent.mouseDown(icon)
      // Assertions — type becomes '' (show password)
      expect(container.querySelector('input')).not.toHaveAttribute('type', 'password')
    })

    test('cleans up show-password class on unmount', () => {
      // Declaration
      const onChange = jest.fn()
      const { unmount, getAllByTestId } = render(
        <Input showPasswordIcon type='password' value='secret' onChange={onChange} />
      )
      const icon = getAllByTestId('mock-fa-icon').find(i =>
        i.classList.contains('ap-input__action-password')
      )!
      fireEvent.mouseDown(icon)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region clear icon
  describe('clear icon', () => {

    test('shows clear icon when showClearIcon=true and value is not empty', () => {
      // Declaration
      const onChange = jest.fn()
      const { getAllByTestId } = render(
        <Input showClearIcon value='hello' onChange={onChange} />
      )
      // Execution + Assertions
      expect(getAllByTestId('mock-fa-icon').length).toBeGreaterThan(0)
    })

    test('does not show clear icon when value is empty', () => {
      // Declaration
      const onChange = jest.fn()
      const { queryAllByTestId } = render(
        <Input showClearIcon value='' onChange={onChange} />
      )
      // Execution + Assertions
      expect(queryAllByTestId('mock-fa-icon')).toHaveLength(0)
    })

    test('calls onChange with empty string when clear icon is clicked', () => {
      // Declaration
      const onChange = jest.fn()
      const { getAllByTestId } = render(
        <Input showClearIcon value='hello' onChange={onChange} />
      )
      const icon = getAllByTestId('mock-fa-icon')[0]
      // Execution
      fireEvent.click(icon)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: '' })
    })

  })
  // #endregion

})
