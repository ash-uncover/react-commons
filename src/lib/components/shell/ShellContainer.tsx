import React from 'react'
//
import {
  useClasses
} from '../..'
// CSS
import './ShellContainer.css'

// #region Declaration
export interface ShellContainerProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties

  level?: number
}
// #endregion

// #region Component
export const ShellContainer = ({
  className,
  level,
  style,

  children
}: ShellContainerProperties) => {

  // #region > Hooks
  const container = React.useRef(null)
  const { classBuilder, classes } = useClasses(['ap-shell-container', className])
  React.useEffect(() => {
    let containerLevel = 0
    if (typeof level === 'undefined') {
      if (container.current) {
        containerLevel = computeContainerLevel(container.current)
      }
    } else {
      containerLevel = validContainerLevel(level)
    }
    classBuilder.add(`ap-shell-container-${containerLevel}`)
    return () => {
      classBuilder.remove(`ap-shell-container-${containerLevel}`)
    }
  }, [container, level])
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return (
    <div
      className={classes}
      style={style}
      ref={container}
    >
      {children}
    </div>
  )
  // #endregion
}
// #endregion

// #region Internal
export function computeContainerLevel(element: HTMLElement): number {
  let result = 0
  if (element) {
    const parentContainer = getParentContainer(element)
    if (parentContainer) {
      result = 1 + computeContainerLevel(parentContainer)
    }
  }
  return validContainerLevel(result)
}
export function validContainerLevel(level: number): number {
  return Math.max(Math.min(level, 10), 0)
}
export function getParentContainer(element: HTMLElement): HTMLElement | null {
  if (element && element.parentElement) {
    if (element.parentElement.classList.contains('ap-shell-container')) {
      return element.parentElement
    }
    return getParentContainer(element.parentElement)
  }
  return null
}
// #endregion