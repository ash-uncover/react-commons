import React, {
  useEffect,
  useRef
} from 'react'

import {
  usePrevious
} from 'lib/hooks'

import {
  buildClassName
} from 'lib/ComponentUtils'

import './Carousel.scss'

export const getClassName = (className) => buildClassName(
  'carousel',
  'prepare',
  className
)

const Carousel = ({
  className,
  direction,
  children
}) => {
  const container = useRef(null)
  const prevChildren = usePrevious(children)

  if (container.current) {
    container.current.classList.add('prepare')
  }

  const cleanClass = () => {
    setTimeout(() => {
      if (container) {
        container.current.classList.remove('prepare')
      }
    }, 0)
  }

  useEffect(() => {
    cleanClass()
  })

  const theclass = getClassName(className)
  console.log('render carousel: ' + theclass)

  return (
    <div
      className={theclass}
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

export default Carousel
