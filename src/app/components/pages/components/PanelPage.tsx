import React from 'react'
import {
  Panel,
  PanelFooter,
  PanelHeader,
  TitleLevels,
} from '../../../../lib'

export const PanelPage = () => {
  return (
    <>
      <Panel title='Basic panel'>
        Panel content goes here.
      </Panel>
      <Panel title='Expandable panel' expandable>
        This panel can be collapsed and expanded.
      </Panel>
      <Panel title='Expandable (collapsed by default)' expandable expanded={false}>
        Hidden until expanded.
      </Panel>
      <Panel title='H2 title' titleLevel={TitleLevels.H2}>
        Panel with a larger title level.
      </Panel>
      <Panel title='With header and footer'>
        <PanelHeader>Custom header content</PanelHeader>
        Main panel content.
        <PanelFooter>Custom footer content</PanelFooter>
      </Panel>
    </>
  )
}
