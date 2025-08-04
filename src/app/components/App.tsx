import React from 'react'
//
import {
  ICONS,
  Menu,
  Shell,
} from '../../lib'
import { Page1 } from './Page1'
import { Page3 } from './Page3'
// CSS
import './App.css'

// #region Declaration
export interface AppProperties extends React.PropsWithChildren {
}
// #endregion

// #region Component
export const App = ({
}: AppProperties) => {

  // #region > Render
  return (
    <Shell>
      <Menu
        container={true}
        containerLevel={10}
        menu={{
          items: [{
            name: 'Item 1',
            icon: ICONS.FAS_GAMEPAD,
            component: <Page1 />
          }, {
            name: 'Item 2',
            icon: ICONS.FAS_GIFTS,
            component: <div>ITEM 2</div>
          }, {
            name: 'Item 3',
            icon: ICONS.FAS_GEAR,
            component: <Page3 />
          }]
        }}
      />
    </Shell>
  )
  // #endregion
}
// #endregion
