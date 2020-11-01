import React from 'react'

import {
  buildClassName
} from 'lib/ComponentUtils'

export const getClassName = (className) => buildClassName(
  'btn',
  className
)

const Button = ({
  className,
  type,
  tooltip,
  disabled,
  onClick,
  children
}) => {
  return (
    <button
      className={getClassName(className)}
      type={type || 'button'}
      disabled={disabled}
      tooltip={tooltip}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
