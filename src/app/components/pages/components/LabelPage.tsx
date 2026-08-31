import React from 'react'
import {
  Label,
  Panel,
} from '../../../../lib'

export const LabelPage = () => {
  return (
    <Panel title='Label'>
      <Label text='Simple text label' />
      <Label text='Another label' />
      <Label>Children content</Label>
    </Panel>
  )
}
