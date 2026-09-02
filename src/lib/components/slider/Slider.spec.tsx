/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Slider } from './Slider'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    Button: ({ children, disabled, onClick }: any) =>
      require('react').createElement('button', { 'data-testid': 'mock-button', disabled, onClick }, children),
  }
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) =>
    require('react').createElement('span', { 'data-icon': String(icon) }),
}))

// jsdom does not implement Touch; provide a minimal polyfill
if (typeof (global as any).Touch === 'undefined') {
  ;(global as any).Touch = class Touch {
    identifier: number
    target: EventTarget
    clientX: number
    clientY: number
    constructor(init: { identifier: number; target: EventTarget; clientX?: number; clientY?: number }) {
      this.identifier = init.identifier
      this.target = init.target
      this.clientX = init.clientX ?? 0
      this.clientY = init.clientY ?? 0
    }
  }
}

describe('Slider', () => {

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers())
    jest.useRealTimers()
  })

  // #region render
  describe('render', () => {

    test('renders a number input (hidden)', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      // Assertions
      const input = container.querySelector('input[type="number"]')
      expect(input).toBeInTheDocument()
    })

    test('renders two buttons (down/up)', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      // Assertions
      expect(screen.getAllByTestId('mock-button')).toHaveLength(2)
    })

    test('disables buttons when disabled=true', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      render(<Slider disabled min={0} max={100} value={50} onChange={onChange} />)
      // Assertions
      const buttons = screen.getAllByTestId('mock-button')
      expect(buttons[0]).toBeDisabled()
      expect(buttons[1]).toBeDisabled()
    })

    test('shows current value in the tooltip', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Slider min={0} max={100} value={30} onChange={onChange} />)
      // Assertions
      expect(container.querySelector('.ap-slider__control--toolip')).toHaveTextContent('30%')
    })

    test('bar active width reflects current value', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      // Assertions
      const activeBar = container.querySelector('.ap-slider__control--bar-active') as HTMLElement
      expect(activeBar.style.width).toBe('50%')
    })

  })
  // #endregion

  // #region disabled modifier
  describe('disabled modifier', () => {

    test('adds disabled class when disabled=true', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Slider disabled min={0} max={100} value={50} onChange={onChange} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-slider--disabled')
    })

    test('does not add disabled class when disabled=false', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-slider--disabled')
    })

    test('removes disabled class when disabled changes to false', () => {
      // Declaration
      const onChange = jest.fn()
      const { container, rerender } = render(<Slider disabled min={0} max={100} value={50} onChange={onChange} />)
      // Execution
      rerender(<Slider min={0} max={100} value={50} onChange={onChange} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-slider--disabled')
    })

    test('cleans up disabled class on unmount', () => {
      // Declaration
      const onChange = jest.fn()
      const { unmount } = render(<Slider disabled min={0} max={100} value={50} onChange={onChange} />)
      // Execution + Assertions — no error
      unmount()
    })

  })
  // #endregion

  // #region value down button
  describe('value down button', () => {

    test('decrements value by step when down button is clicked', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Slider min={0} max={100} step={10} value={50} onChange={onChange} />)
      const [downBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(downBtn)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 40 })
    })

    test('uses computed step when step is not provided', () => {
      // Declaration
      const onChange = jest.fn()
      // max-min=100, DEFAULT_STEPS=10, step=10
      render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const [downBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(downBtn)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 40 })
    })

    test('floors to current step boundary when value is not on a step boundary', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Slider min={0} max={100} step={10} value={55} onChange={onChange} />)
      const [downBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(downBtn)
      // Assertions — floors to 50 (current step boundary)
      expect(onChange).toHaveBeenCalledWith({ value: 50 })
    })

    test('clamps to min when decremented below min', () => {
      // Declaration — start at min value so down goes below min
      const onChange = jest.fn()
      render(<Slider min={0} max={100} step={10} value={0} onChange={onChange} />)
      const [downBtn] = screen.getAllByTestId('mock-button')
      // Execution — trying to go below 0
      fireEvent.click(downBtn)
      // Assertions — clamped to min=0
      expect(onChange).toHaveBeenCalledWith({ value: 0 })
    })

  })
  // #endregion

  // #region value up button
  describe('value up button', () => {

    test('increments value by step when up button is clicked', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Slider min={0} max={100} step={10} value={50} onChange={onChange} />)
      const [, upBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(upBtn)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 60 })
    })

    test('clamps to max when incremented above max', () => {
      // Declaration — start at max value so up goes above max
      const onChange = jest.fn()
      render(<Slider min={0} max={100} step={10} value={100} onChange={onChange} />)
      const [, upBtn] = screen.getAllByTestId('mock-button')
      // Execution — trying to go above 100
      fireEvent.click(upBtn)
      // Assertions — clamped to max=100
      expect(onChange).toHaveBeenCalledWith({ value: 100 })
    })

  })
  // #endregion

  // #region value updated from outside
  describe('value updated from outside', () => {

    test('updates currentValue when value prop changes', () => {
      // Declaration
      const onChange = jest.fn()
      const { container, rerender } = render(<Slider min={0} max={100} value={30} onChange={onChange} />)
      // Execution
      rerender(<Slider min={0} max={100} value={70} onChange={onChange} />)
      // Assertions
      const activeBar = container.querySelector('.ap-slider__control--bar-active') as HTMLElement
      expect(activeBar.style.width).toBe('70%')
    })

  })
  // #endregion

  // #region hidden input change
  describe('hidden input change', () => {

    test('calls onChange when the hidden number input changes', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const input = container.querySelector('input[type="number"]') as HTMLInputElement
      // Execution
      fireEvent.change(input, { target: { value: '75' } })
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 75 })
    })

  })
  // #endregion

  // #region mouse events on control
  describe('mouse events on control', () => {

    test('shows tooltip on mouseEnter', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      // Execution
      fireEvent.mouseEnter(control)
      // Assertions
      const tooltip = container.querySelector('.ap-slider__control--toolip') as HTMLElement
      expect(tooltip.style.opacity).toBe('1')
    })

    test('starts tooltip timeout on mouseLeave', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      fireEvent.mouseEnter(control)
      // Execution
      fireEvent.mouseLeave(control)
      // Run timeout to hide tooltip
      act(() => jest.runAllTimers())
      // Assertions
      const tooltip = container.querySelector('.ap-slider__control--toolip') as HTMLElement
      expect(tooltip.style.opacity).toBe('0')
    })

    test('mouseDown starts drag mode (transition becomes none)', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      // Execution
      fireEvent.mouseDown(control)
      // Assertions — drag mode = true means transition is 'none'
      const activeBar = container.querySelector('.ap-slider__control--bar-active') as HTMLElement
      expect(activeBar.style.transition).toBe('none')
    })

    test('mouseUp stops drag', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const sliderBar = container.querySelector('.ap-slider__control--bar') as HTMLElement
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0, width: 100, height: 0, top: 0, right: 100, bottom: 0, x: 0, y: 0, toJSON: () => {}
      } as DOMRect)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      fireEvent.mouseDown(control)
      // Execution
      act(() => {
        const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true, clientX: 75 })
        document.dispatchEvent(mouseUpEvent)
      })
      // Assertions — drag mode off
      const activeBar = container.querySelector('.ap-slider__control--bar-active') as HTMLElement
      expect(activeBar.style.transition).not.toBe('none')
    })

    test('mousemove updates slider position during drag', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const sliderBar = container.querySelector('.ap-slider__control--bar') as HTMLElement
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0, width: 100, height: 0, top: 0, right: 100, bottom: 0, x: 0, y: 0, toJSON: () => {}
      } as DOMRect)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      fireEvent.mouseDown(control)
      // Execution
      act(() => {
        const mouseMoveEvent = new MouseEvent('mousemove', { bubbles: true, clientX: 30 })
        document.dispatchEvent(mouseMoveEvent)
      })
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 30 })
    })

    test('mouseleave on document stops drag', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const sliderBar = container.querySelector('.ap-slider__control--bar') as HTMLElement
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0, width: 100, height: 0, top: 0, right: 100, bottom: 0, x: 0, y: 0, toJSON: () => {}
      } as DOMRect)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      fireEvent.mouseDown(control)
      // Execution
      act(() => {
        const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true, clientX: 50 })
        document.dispatchEvent(mouseLeaveEvent)
      })
      // Assertions — drag stops
      const activeBar = container.querySelector('.ap-slider__control--bar-active') as HTMLElement
      expect(activeBar.style.transition).not.toBe('none')
    })

  })
  // #endregion

  // #region touch events
  describe('touch events on control', () => {

    test('touchStart starts drag mode', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      // Execution
      fireEvent.touchStart(control)
      // Assertions — dragMode active => transition none
      const activeBar = container.querySelector('.ap-slider__control--bar-active') as HTMLElement
      expect(activeBar.style.transition).toBe('none')
    })

    test('touchend stops drag and calls onChange', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const sliderBar = container.querySelector('.ap-slider__control--bar') as HTMLElement
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0, width: 100, height: 0, top: 0, right: 100, bottom: 0, x: 0, y: 0, toJSON: () => {}
      } as DOMRect)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      fireEvent.touchStart(control)
      // Execution
      act(() => {
        const touchEndEvent = new TouchEvent('touchend', {
          changedTouches: [new Touch({ identifier: 1, target: sliderBar, clientX: 40 })],
        })
        document.dispatchEvent(touchEndEvent)
      })
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 40 })
    })

    test('touchcancel stops drag', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const sliderBar = container.querySelector('.ap-slider__control--bar') as HTMLElement
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0, width: 100, height: 0, top: 0, right: 100, bottom: 0, x: 0, y: 0, toJSON: () => {}
      } as DOMRect)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      fireEvent.touchStart(control)
      // Execution
      act(() => {
        const touchCancelEvent = new TouchEvent('touchcancel', {
          changedTouches: [new Touch({ identifier: 1, target: sliderBar, clientX: 20 })],
        })
        document.dispatchEvent(touchCancelEvent)
      })
      // Assertions — drag stopped
      const activeBar = container.querySelector('.ap-slider__control--bar-active') as HTMLElement
      expect(activeBar.style.transition).not.toBe('none')
    })

    test('touchmove during drag calls onChange', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const sliderBar = container.querySelector('.ap-slider__control--bar') as HTMLElement
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0, width: 100, height: 0, top: 0, right: 100, bottom: 0, x: 0, y: 0, toJSON: () => {}
      } as DOMRect)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      fireEvent.touchStart(control)
      // Execution
      act(() => {
        const touchMoveEvent = new TouchEvent('touchmove', {
          touches: [new Touch({ identifier: 1, target: sliderBar, clientX: 60 })],
        })
        document.dispatchEvent(touchMoveEvent)
      })
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 60 })
    })

  })
  // #endregion

  // #region NaN min/max
  describe('NaN min or max', () => {

    test('does not clamp when min is NaN', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Slider min={NaN} max={100} step={10} value={50} onChange={onChange} />)
      const [downBtn] = screen.getAllByTestId('mock-button')
      // Execution — down from 50 with step 10 => 40, min NaN => no clamping
      fireEvent.click(downBtn)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 40 })
    })

    test('does not clamp when max is NaN', () => {
      // Declaration
      const onChange = jest.fn()
      render(<Slider min={0} max={NaN} step={10} value={50} onChange={onChange} />)
      const [, upBtn] = screen.getAllByTestId('mock-button')
      // Execution
      fireEvent.click(upBtn)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 60 })
    })

  })
  // #endregion
  describe('slider click', () => {

    test('handleSliderClick moves slider to click position', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<Slider min={0} max={100} value={50} onChange={onChange} />)
      const sliderBar = container.querySelector('.ap-slider__control--bar') as HTMLElement
      jest.spyOn(sliderBar, 'getBoundingClientRect').mockReturnValue({
        left: 0, width: 100, height: 0, top: 0, right: 100, bottom: 0, x: 0, y: 0, toJSON: () => {}
      } as DOMRect)
      const control = container.querySelector('.ap-slider__control') as HTMLElement
      // Execution
      fireEvent.click(control, { clientX: 80 })
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ value: 80 })
    })

  })
  // #endregion

})
