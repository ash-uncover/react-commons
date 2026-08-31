import React from 'react'
import {
  Panel,
  Select,
} from '../../../../lib'

const OPTIONS = [
  { id: 'opt1', text: 'Option 1' },
  { id: 'opt2', text: 'Option 2' },
  { id: 'opt3', text: 'Option 3' },
]

export const SelectPage = () => {
  const [value, setValue] = React.useState('opt1')

  return (
    <>
      <Panel title='Select'>
        <Select value={value} values={OPTIONS} onChange={e => setValue(e.value)} />
      </Panel>
      <Panel title='Disabled'>
        <Select value={value} values={OPTIONS} disabled onChange={e => setValue(e.value)} />
      </Panel>
    </>
  )
}
