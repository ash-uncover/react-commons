import React from 'react'
//
import {
  Panel,
  ShellPage,
} from '../../lib'

// #region Declaration
export interface Page1Properties extends React.PropsWithChildren {
}
// #endregion

// #region Component
export const Page1 = ({
}: Page1Properties) => {

  // #region > Render
  return (
    <Panel title={'Panel 1'}>
      <Panel title={'Panel 2'}>
        <Panel title={'Panel 3'}>
          <Panel title={'Panel 4'}>
            <Panel title={'Panel 5'}>
              <Panel title={'Panel 6'}>
                <Panel title={'Panel 7'}>
                  <Panel title={'Panel 8'}>
                    <Panel title={'Panel 9'}>
                      <Panel title={'Panel 10'}>
                      </Panel>
                    </Panel>
                  </Panel>
                </Panel>
              </Panel>
            </Panel>
          </Panel>
        </Panel>
      </Panel>
    </Panel>
  )
  // #endregion
}
// #endregion
