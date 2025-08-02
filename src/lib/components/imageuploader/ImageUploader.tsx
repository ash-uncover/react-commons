import React, {
  useState,
  useRef
} from 'react'

import {
  FileUtils
} from '@sol.ac/js-utils'

import './ImageUploader.css'

const createObjectURL = (object: Blob | MediaSource): string => {
  return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
}

const revokeObjectURL = (url: string): void => {
  return (window.URL) ? window.URL.revokeObjectURL(url) : window.webkitURL.revokeObjectURL(url)
}

export const MAX_SIZE = 2100000

interface IType {
  ext: string
  template: string
}
export const TYPES: IType[] = [
  { ext: 'bmp', template: 'image/bmp' },
  { ext: 'jpeg', template: 'image/jpeg' },
  { ext: 'jpg', template: 'image/jpg' },
  { ext: 'png', template: 'image/png' }
]

export const TYPES_ACCEPT: string[] = TYPES.reduce((acc: string[], type) => {
  acc.push(type.ext)
  acc.push(type.template)
  return acc
}, [])

export const TYPES_EXT = TYPES.map((type) => type.ext)

// ---------------------------------------------------
// Create Component ImageUploader
// ---------------------------------------------------

interface ImageUploaderProperties {
  className?: string
  style?: React.CSSProperties

  name: string
  src: string

  onChange: (event: { file: any }) => void
}
export const ImageUploader = ({
  name,
  src,
  onChange
}: ImageUploaderProperties) => {

  // Hooks //

  const [error, setError] = useState('')
  const [source, setSource] = useState(src)

  const fileInput = useRef<HTMLInputElement>(null)

  // Callbacks //

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (fileInput.current) {
      const files = fileInput.current.files
      if (files?.length && files[0]) {
        const file = files[0]
        const extOk = FileUtils.checkExtention(file, TYPES_EXT)
        if (!extOk) {
          setError('Type de fichier non supporté')
          return
        }
        const sizeOk = FileUtils.checkSize(file, MAX_SIZE)
        if (!sizeOk) {
          setError('Le fichier sélectionné est trop gros (taille max: 2Mo)')
          return
        }
        setError('')
        const url = createObjectURL(file)
        setSource(url)
        revokeObjectURL(url)
        onChange({ file })
      }
    }
  }

  // Rendering //

  return (
    <div className='image-uploader'>
      <div className='images'>
        <img
          className='image l'
          src={source}
        />
        <img
          className='image m'
          src={source}
        />
        <img
          className='image s'
          src={source}
        />
      </div>

      <div className='controls'>
        {error && (
          <div className='error'>
            {error}
          </div>
        )}

        <label
          htmlFor={name || 'file-upload'}
          className='label'
        >
          Sélectionnez un fichier
        </label>

        <input
          id={name || 'file-upload'}
          className='input'
          type='file'
          ref={fileInput}
          //accept={TYPES_ACCEPT}
          onChange={onFileChange}
        />
      </div>
    </div>
  )
}
