import React from 'react'
import {
  ImageUploader,
  Panel,
} from '../../../../lib'

export const ImageUploaderPage = () => {
  const [src, setSrc] = React.useState('')

  return (
    <Panel title='Image uploader'>
      <ImageUploader
        name='demo-image'
        src={src}
        onChange={e => setSrc(e.file)}
      />
    </Panel>
  )
}
