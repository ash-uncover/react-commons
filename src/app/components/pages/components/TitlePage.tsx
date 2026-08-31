import React from 'react'
import {
  Panel,
  Title,
  TitleLevels,
} from '../../../../lib'

export const TitlePage = () => {
  return (
    <Panel title='Title levels'>
      <Title level={TitleLevels.H1} text='Heading 1' />
      <Title level={TitleLevels.H2} text='Heading 2' />
      <Title level={TitleLevels.H3} text='Heading 3' />
      <Title level={TitleLevels.H4} text='Heading 4' />
      <Title level={TitleLevels.H5} text='Heading 5' />
      <Title level={TitleLevels.H6} text='Heading 6' />
    </Panel>
  )
}
