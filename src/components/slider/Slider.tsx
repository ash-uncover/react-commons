import React, { useEffect, useRef } from 'react'
//
import { ClassBuilder } from '../ComponentUtil'
// CSS
import './Slider.css'

// #region Declaration
interface SliderProperties {
  className?: string
  style?: React.CSSProperties

  max: number
  min?: number
  value: number
  onChange: (event: { value: number }) => void
}
// #endregion

// #region Component
export const Slider = ({
  className,
  style,

  max,
  min = 0,
  value,
  onChange,
}: SliderProperties) => {

  // #region Hooks
  const rail = useRef<HTMLDivElement>(null)
  useEffect(() => {
    return unregisterEvents
  }, [])
  // #endregion
  
  // #region Events
  function onRailClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const mouseX = event.pageX
    changeFromX(mouseX)
  }
  function onSpotMouseDown() {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
  }
  function onMouseUp() {
    unregisterEvents()
  }
  function onMouseMove(event: MouseEvent) {
    const mouseX = event.pageX
    changeFromX(mouseX)
  }
  function changeFromX(x: number) {
    if (rail.current) {
      const container = rail.current.getBoundingClientRect()
      const containerWidth = container.width
      const containerX = container.x

      const delta = Math.min(Math.max(0, x - containerX), containerWidth)
      const deltaPerc = delta * 100 / containerWidth
      const newValue = min + deltaPerc * (max - min) / 100
      onChange({ value: newValue })
    }
  }
  function unregisterEvents() {
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('mousemove', onMouseMove)
  }
  // #endregion

  // #region Render
  const classes = new ClassBuilder(['ap-slider', className])
  return (
    <div
      className={classes.className}
      style={style}
    >
      <div
        ref={rail}
        className='ap-slider__rail'
        onClick={onRailClick}
      >
        <div
          className='ap-slider__pusher'
          style={{
            width: `${((value - min) * 100 / (max - min))}%`
          }}
        />
        <div
          className='ap-slider__spot'
          title={String(value)}
          onMouseDown={onSpotMouseDown}
        />
      </div>
    </div>
  )
  // #endregion
}
// #endregion
