import React from 'react'
import {
  Panel,
  TextArea,
} from '../../../../lib'

export const TextAreaPage = () => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <Panel title='TextArea'>
        <TextArea value={value} placeholder='Enter text...' onChange={e => setValue(e.value)} />
      </Panel>
      <Panel title='Custom rows'>
        <TextArea value={value} rows={8} placeholder='Taller text area...' onChange={e => setValue(e.value)} />
      </Panel>
      <Panel title='Disabled'>
        <TextArea value='Cannot edit this.' disabled onChange={() => {}} />
      </Panel>
    </>
  )
}
