import React from 'react'
//
import {
  Panel,
  Shell,
  ShellPage
} from '../../lib'
// CSS
import './App.css'

// #region Declaration
export interface AppProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
}
// #endregion

// #region Component
export const App = ({
  className,
  style,

  children
}: AppProperties) => {

  // #region > Render
  return (
    <Shell>
      <ShellPage>
        <Panel title={'Hello'}></Panel>
      </ShellPage>
    </Shell>
  )
  // #endregion
}
// #endregion
