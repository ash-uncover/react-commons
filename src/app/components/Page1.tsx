import React from 'react'
//
import {
  Panel,
  Select,
  ShellPage,
} from '../../lib'

// #region Declaration
export interface Page1Properties extends React.PropsWithChildren {
}
// #endregion

// #region Component
export const Page1 = ({
}: Page1Properties) => {

  // #region > Hooks
  const [selectValue, setSelectValue] = React.useState('v1')
  // #endregion

  // #region > Render
  return (
    <Panel title={'Panel 1'}>
      <Select 
        value={selectValue}
        values={[
          { id: 'v1', text: 'Value 1'},
          { id: 'v2', text: 'Value 2'}
        ]}
        onChange={({ value }) => { setSelectValue(value) }}
      />
    </Panel>
  )
  // #endregion
}
// #endregion
