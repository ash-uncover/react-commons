import React, { ReactNode } from 'react'
//
import { 
  TitleLevel, 
  TitleLevels, 
  useClasseName, 
  useClasses
} from '../..'
// CSS
import './Title.css'

// #region Declaration
interface TitleProperties {
  className?: string
  style?: React.CSSProperties

  level?: TitleLevel
  text?: string

  children?: ReactNode
}
// #endregion

// #region Component
export const Title = ({
  className,
  style,

  level = TitleLevels.H1,
  text,

  children,
}: TitleProperties) => {

  // #region >  Hooks
  const { classBuilder, classes } = useClasses(['ap-title'])
  useClasseName(classBuilder, className)
    React.useEffect(() => {
      classBuilder.add(`ap-title--${level.toLowerCase()}`)
      return () => {
        classBuilder.remove(`ap-title--${level.toLowerCase()}`)
      }
    }, [level])
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return React.createElement(
    level.toLowerCase(),
    {
      className: classes,
      style
    },
    children || text
  )
  // #endregion
}
// #endregion