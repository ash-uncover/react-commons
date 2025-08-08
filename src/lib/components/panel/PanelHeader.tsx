import React from 'react'
//
import { 
  useClasseName,
  useClasses 
} from '../..'
// CSS
import './PanelHeader.css'

// #region Declaration
interface PanelHeaderProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
}
// #endregion

// #region Component
export const PanelHeader = ({
  className,
  style,

  children,
}: PanelHeaderProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-panel-header'])
  useClasseName(classBuilder, className)
  // #endregion

  // #region > Events
  // #endregion

  // #region Render
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
