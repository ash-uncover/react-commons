import React from 'react'
//
import {
  FormGroupDirection,
  FormGroupDirections,
  useClasseName,
  useClasses
} from '../..'
// CSS
import './FormGroup.css'

// #region Declaration
interface FormGroupProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties

  direction?: FormGroupDirection
}
// #endregion

// #region
export const FormGroup = ({
  className,
  style,

  direction = FormGroupDirections.VERTICAL,

  children,
}: FormGroupProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-form-group'])
  useClasseName(classBuilder, className)
  React.useEffect(() => {
    classBuilder.add(`ap-form-group--${direction.toLowerCase()}`)
    return () => {
      classBuilder.remove(`ap-form-group--${direction.toLowerCase()}`)
    }
  }, [direction])
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return (
    <div
      className={classes}
      style={style}
    >
      {children}
    </div>
  )
  // #endregion
}
// #endregion