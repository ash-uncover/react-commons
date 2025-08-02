import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
import {
   Button, 
   useClasses
  } from '../..'
// CSS
import './Slider.css'

// #region Declaration
const DEFAULT_STEPS = 10

let TOOLTIP_TIMEOUT: ReturnType<typeof setTimeout>
const TOOLTIP_TIMEOUT_DELAY = 1000

export interface SliderProperties {
  className?: string
  style?: React.CSSProperties

  disabled?: boolean
  min: number
  max: number
  step?: number
  value: number

  onChange: (event: { value: number }) => void
}
// #endregion

// #region Component
export const Slider = ({
  className,

  disabled,
  min,
  max,
  step,
  value,

  onChange,
}: SliderProperties) => {

  // #region > Hooks
  const sliderBar = React.useRef<HTMLDivElement>(null)

  const [dragMode, setDragMode] = React.useState(false)
  const [showTooltip, setShowTooltip] = React.useState(false)
  const [currentValue, setCurrentValue] = React.useState(value || min || 0)

  React.useEffect(() => {
    if (value !== currentValue) {
      updateValue(value)
    }
  }, [value])

  const updateValue = (newValue: number) => {
    let tmpValue = newValue
    if (!isNaN(min) && tmpValue < min) {
      tmpValue = min
    }
    if (!isNaN(max) && tmpValue > max) {
      tmpValue = max
    }
    setCurrentValue(tmpValue)
    onChange({ value: tmpValue })
    startTooltipTimeout()
  }

  const startTooltipTimeout = () => {
    setShowTooltip(true)
    clearTimeout(TOOLTIP_TIMEOUT)
    TOOLTIP_TIMEOUT = setTimeout(() => setShowTooltip(false), TOOLTIP_TIMEOUT_DELAY)
  }

  const { classBuilder, classes } = useClasses(['ap-slider', className])
    React.useEffect(() => {
      if (disabled) {
        classBuilder.add(`ap-slider--disabled`)
      }
      return () => {
        classBuilder.remove(`ap-slider--disabled`)
      }
    }, [disabled])
  // #endregion

  // #region > Events
  const getStep = () => {
    let realStep = step
    if (!realStep) {
      realStep = Math.max(Math.round((max - min) / DEFAULT_STEPS), 1)
    }
    return realStep
  }
  const moveSlider = (x: number) => {
    if (sliderBar?.current) {
      const rectBar = sliderBar.current.getBoundingClientRect()
      const clientWidth = rectBar.width
      const relativePosition = x - rectBar.left
      const newValue = Math.round(min + (relativePosition / clientWidth) * (max - min))
      updateValue(newValue)
    }
  }
  const handleTouchStart = () => {
    startTouch()
  }
  const handleMouseDown = () => {
    startDrag()
  }
  const startTouch = () => {
    setShowTooltip(true)
    setDragMode(true)
    document.addEventListener('touchend', stopTouch)
    document.addEventListener('touchcancel', stopTouch)
    document.addEventListener('touchmove', doTouch)
  }
  const doTouch = (event: TouchEvent) => {
    moveSlider(event.touches[0].clientX)
  }
  const stopTouch = (event: TouchEvent) => {
    startTooltipTimeout()
    moveSlider(event.changedTouches[0].clientX)
    setDragMode(false)
    document.removeEventListener('touchend', stopTouch)
    document.removeEventListener('touchcancel', stopTouch)
    document.removeEventListener('touchmove', doTouch)
  }
  const startDrag = () => {
    setShowTooltip(true)
    setDragMode(true)
    document.addEventListener('mouseleave', stopDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('mousemove', doDrag)
  }
  const doDrag = (event: MouseEvent) => {
    moveSlider(event.clientX)
  }
  const stopDrag = (event: MouseEvent) => {
    startTooltipTimeout()
    moveSlider(event.clientX)
    setDragMode(false)
    document.removeEventListener('mouseleave', stopDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('mousemove', doDrag)
  }
  const handleMouseEnter = () => {
    setShowTooltip(true)
  }
  const handleMouseLeave = () => {
    startTooltipTimeout()
  }
  const handleValueDown = () => {
    const realStep = getStep()
    let newValue = (Math.floor(currentValue / realStep) - 1) * realStep
    if (currentValue % realStep) {
      newValue = Math.floor(currentValue / realStep) * realStep
    }
    updateValue(newValue)
  }
  const handleValueUp = () => {
    const realStep = getStep()
    const newValue = (Math.floor(currentValue / realStep) + 1) * realStep
    updateValue(newValue)
  }
  const handleSliderClick = (event: React.MouseEvent) => {
    moveSlider(event.clientX)
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(Number(event.target.value))
  }
  // #endregion

  // #region > Render
  return (
    <div className={classes}>

      <input
        style={{
          display: 'none'
        }}
        type='number'
        min={min}
        max={max}
        value={currentValue}
        onChange={handleChange}
      />

      <Button
        disabled={disabled}
        onClick={handleValueDown}
      >
        <FontAwesomeIcon icon={['fas', 'chevron-left']} />
      </Button>

      <div
        className='ap-slider__control'
        onClick={handleSliderClick}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        <div
          className='ap-slider__control--bar'
          ref={sliderBar}
        >
          <div
            className='ap-slider__control--bar ap-slider__control--bar-active'
            style={{
              width: `${((currentValue - min) * 100) / (max - min)}%`,
              transition: dragMode ? 'none' : 'width 0.05s'
            }}
          >
            <div
              className='ap-slider__control--indicator'
              tabIndex={0}
            >
            </div>

            <div
              className='ap-slider__control--toolip'
              style={{
                pointerEvents: 'none',
                opacity: showTooltip ? 1 : 0,
                transition: 'opacity 0.5s'
              }}
            >
              {currentValue}%
            </div>

          </div>
        </div>
      </div>

      <Button
        disabled={disabled}
        onClick={handleValueUp}
      >
        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
      </Button>

    </div>
  )
  // #endregion
}