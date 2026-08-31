import React from 'react'
import {
  Button,
  ButtonSemantics,
  FormGroup,
  FormGroupDirections,
  Input,
  Label,
  Panel,
  Select,
  TextArea,
} from '../../../../lib'

const SUBJECTS = [
  { id: 'general', text: 'General inquiry' },
  { id: 'support', text: 'Support request' },
  { id: 'feedback', text: 'Feedback' },
]

export const FormSample = () => {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [subject, setSubject] = React.useState('general')
  const [message, setMessage] = React.useState('')

  const handleSubmit = () => {
    alert(`Submitted:\n${firstName} ${lastName}\n${email}\n${subject}\n${message}`)
  }
  const handleReset = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setSubject('general')
    setMessage('')
  }

  return (
    <Panel title='Contact form'>
      <FormGroup direction={FormGroupDirections.VERTICAL}>
        <Label text='First name' />
        <Input value={firstName} placeholder='Enter first name' onChange={e => setFirstName(e.value)} />
      </FormGroup>
      <FormGroup direction={FormGroupDirections.VERTICAL}>
        <Label text='Last name' />
        <Input value={lastName} placeholder='Enter last name' onChange={e => setLastName(e.value)} />
      </FormGroup>
      <FormGroup direction={FormGroupDirections.VERTICAL}>
        <Label text='Email' />
        <Input value={email} placeholder='Enter email' showClearIcon onChange={e => setEmail(e.value)} />
      </FormGroup>
      <FormGroup direction={FormGroupDirections.VERTICAL}>
        <Label text='Subject' />
        <Select value={subject} values={SUBJECTS} onChange={e => setSubject(e.value)} />
      </FormGroup>
      <FormGroup direction={FormGroupDirections.VERTICAL}>
        <Label text='Message' />
        <TextArea value={message} rows={5} placeholder='Write your message...' onChange={e => setMessage(e.value)} />
      </FormGroup>
      <Button semantic={ButtonSemantics.PRINCIPAL} onClick={handleSubmit}>Submit</Button>
      <Button semantic={ButtonSemantics.DEFAULT} onClick={handleReset}>Reset</Button>
    </Panel>
  )
}
