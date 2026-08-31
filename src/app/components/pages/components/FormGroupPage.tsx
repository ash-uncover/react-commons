import React from 'react'
import {
  FormGroup,
  FormGroupDirections,
  Input,
  Label,
  Panel,
} from '../../../../lib'

export const FormGroupPage = () => {
  const [v1, setV1] = React.useState('')
  const [v2, setV2] = React.useState('')

  return (
    <>
      <Panel title='Vertical (default)'>
        <FormGroup direction={FormGroupDirections.VERTICAL}>
          <Label text='First name' />
          <Input value={v1} placeholder='Enter first name' onChange={e => setV1(e.value)} />
        </FormGroup>
      </Panel>
      <Panel title='Horizontal'>
        <FormGroup direction={FormGroupDirections.HORIZONTAL}>
          <Label text='Last name' />
          <Input value={v2} placeholder='Enter last name' onChange={e => setV2(e.value)} />
        </FormGroup>
      </Panel>
    </>
  )
}
