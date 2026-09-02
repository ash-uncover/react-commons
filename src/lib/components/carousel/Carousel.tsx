import React, { useEffect, useRef } from 'react'
import { usePrevious } from '../..'
import './Carousel.css'

// #region Declaration
interface CarouselProperties {
  className?: string
  direction?: string
  children?: React.ReactNode
}
// #endregion

export const getClassName = (className?: string) =>
  ['carousel', className].filter(Boolean).join(' ')

// #region Component
export const Carousel = ({
  className,
  children,
}: CarouselProperties) => {

  const container = useRef<HTMLDivElement>(null)
  const prevChildren = usePrevious(children)

  if (prevChildren) {
    container.current!.classList.add('prepare')
  }

  const cleanClass = () => {
    setTimeout(() => {
      if (container.current) {
        container.current.classList.remove('prepare')
      }
    }, 0)
  }

  useEffect(() => {
    cleanClass()
  })

  return (
    <div
      className={getClassName(className)}
      ref={container}
    >
      <div className='carousel-slide carousel-current'>
        {children}
      </div>
      <div className='carousel-slide carousel-previous'>
        {prevChildren}
      </div>
    </div>
  )
}
// #endregion
