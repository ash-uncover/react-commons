import React from 'react'
//
import { 
  useClasseName,
  useClasses 
} from '../..'
// CSS
import './PanelFooter.css'

// #region Declaration
interface PanelFooterProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
}
// #endregion

// #region Component
export const PanelFooter = ({
  className,
  style,

  children,
}: PanelFooterProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-panel-footer'])
  useClasseName(classBuilder, className)
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
