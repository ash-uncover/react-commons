/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ImageUploader, MAX_SIZE, TYPES, TYPES_ACCEPT, TYPES_EXT } from './ImageUploader'

const mockCheckExtention = jest.fn()
const mockCheckSize = jest.fn()

jest.mock('@sol.ac/js-utils', () => ({
  FileUtils: {
    checkExtention: (file: any, types: any) => mockCheckExtention(file, types),
    checkSize: (file: any, size: any) => mockCheckSize(file, size),
  },
}))

// Stub URL.createObjectURL and URL.revokeObjectURL
const mockCreateObjectURL = jest.fn(() => 'blob:mock-url')
const mockRevokeObjectURL = jest.fn()
Object.defineProperty(window, 'URL', {
  writable: true,
  value: {
    createObjectURL: mockCreateObjectURL,
    revokeObjectURL: mockRevokeObjectURL,
  },
})

function createFile(name: string, size: number, type: string): File {
  const file = new File(['x'.repeat(size)], name, { type })
  return file
}

describe('ImageUploader', () => {

  beforeEach(() => {
    mockCheckExtention.mockReset()
    mockCheckSize.mockReset()
    mockCreateObjectURL.mockClear()
    mockRevokeObjectURL.mockClear()
  })

  // #region constants
  describe('exported constants', () => {

    test('MAX_SIZE is a positive number', () => {
      // Declaration + Execution + Assertions
      expect(MAX_SIZE).toBeGreaterThan(0)
    })

    test('TYPES has expected entries', () => {
      // Declaration + Execution + Assertions
      expect(TYPES.map(t => t.ext)).toContain('png')
      expect(TYPES.map(t => t.ext)).toContain('jpeg')
    })

    test('TYPES_ACCEPT contains ext and template entries', () => {
      // Declaration + Execution + Assertions
      expect(TYPES_ACCEPT).toContain('png')
      expect(TYPES_ACCEPT).toContain('image/png')
    })

    test('TYPES_EXT contains only extensions', () => {
      // Declaration + Execution + Assertions
      expect(TYPES_EXT).toContain('png')
      expect(TYPES_EXT).not.toContain('image/png')
    })

  })
  // #endregion

  // #region render
  describe('render', () => {

    test('renders the image uploader container', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('.image-uploader')).toBeInTheDocument()
    })

    test('renders label with correct htmlFor', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<ImageUploader name='my-uploader' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('label')).toHaveAttribute('for', 'my-uploader')
    })

    test('renders a file input with correct id', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<ImageUploader name='my-uploader' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('input[type="file"]')).toHaveAttribute('id', 'my-uploader')
    })

    test('renders with initial src in images', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<ImageUploader name='avatar' src='http://example.com/img.png' onChange={onChange} />)
      // Assertions
      const images = container.querySelectorAll('img')
      expect(images[0]).toHaveAttribute('src', 'http://example.com/img.png')
    })

    test('does not render error initially', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('.error')).not.toBeInTheDocument()
    })

  })
  // #endregion

  // #region file validation — type error
  describe('file validation — bad extension', () => {

    test('shows type error and does not call onChange when extension is invalid', () => {
      // Declaration
      const onChange = jest.fn()
      mockCheckExtention.mockReturnValue(false)
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      const input = container.querySelector('input[type="file"]') as HTMLInputElement
      const file = createFile('test.txt', 100, 'text/plain')
      // Execution
      Object.defineProperty(input, 'files', { value: [file], configurable: true })
      fireEvent.change(input)
      // Assertions
      expect(container.querySelector('.error')).toBeInTheDocument()
      expect(onChange).not.toHaveBeenCalled()
    })

  })
  // #endregion

  // #region file validation — size error
  describe('file validation — file too large', () => {

    test('shows size error and does not call onChange when file is too large', () => {
      // Declaration
      const onChange = jest.fn()
      mockCheckExtention.mockReturnValue(true)
      mockCheckSize.mockReturnValue(false)
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      const input = container.querySelector('input[type="file"]') as HTMLInputElement
      const file = createFile('test.png', MAX_SIZE + 1, 'image/png')
      // Execution
      Object.defineProperty(input, 'files', { value: [file], configurable: true })
      fireEvent.change(input)
      // Assertions
      expect(container.querySelector('.error')).toBeInTheDocument()
      expect(onChange).not.toHaveBeenCalled()
    })

  })
  // #endregion

  // #region successful upload
  describe('successful upload', () => {

    test('calls onChange with file and updates preview when file is valid', () => {
      // Declaration
      const onChange = jest.fn()
      mockCheckExtention.mockReturnValue(true)
      mockCheckSize.mockReturnValue(true)
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      const input = container.querySelector('input[type="file"]') as HTMLInputElement
      const file = createFile('test.png', 100, 'image/png')
      // Execution
      Object.defineProperty(input, 'files', { value: [file], configurable: true })
      fireEvent.change(input)
      // Assertions
      expect(onChange).toHaveBeenCalledWith({ file })
      expect(mockCreateObjectURL).toHaveBeenCalledWith(file)
      expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
    })

    test('clears error on a valid file after a previous error', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      const input = container.querySelector('input[type="file"]') as HTMLInputElement
      // First: bad file
      mockCheckExtention.mockReturnValueOnce(false)
      const badFile = createFile('bad.txt', 100, 'text/plain')
      Object.defineProperty(input, 'files', { value: [badFile], configurable: true })
      fireEvent.change(input)
      expect(container.querySelector('.error')).toBeInTheDocument()
      // Then: good file
      mockCheckExtention.mockReturnValueOnce(true)
      mockCheckSize.mockReturnValueOnce(true)
      const goodFile = createFile('good.png', 100, 'image/png')
      Object.defineProperty(input, 'files', { value: [goodFile], configurable: true })
      fireEvent.change(input)
      // Assertions
      expect(container.querySelector('.error')).not.toBeInTheDocument()
    })

  })
  // #endregion

  // #region webkitURL fallback
  describe('webkitURL fallback (no window.URL)', () => {

    test('uses webkitURL.createObjectURL when window.URL is undefined', () => {
      // Declaration
      const onChange = jest.fn()
      mockCheckExtention.mockReturnValue(true)
      mockCheckSize.mockReturnValue(true)
      const mockWebkitCreateObjectURL = jest.fn(() => 'blob:webkit-url')
      const mockWebkitRevokeObjectURL = jest.fn()
      // Remove window.URL temporarily
      const originalURL = window.URL
      ;(window as any).URL = undefined
      ;(window as any).webkitURL = {
        createObjectURL: mockWebkitCreateObjectURL,
        revokeObjectURL: mockWebkitRevokeObjectURL,
      }
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      const input = container.querySelector('input[type="file"]') as HTMLInputElement
      const file = createFile('test.png', 100, 'image/png')
      // Execution
      Object.defineProperty(input, 'files', { value: [file], configurable: true })
      fireEvent.change(input)
      // Assertions
      expect(mockWebkitCreateObjectURL).toHaveBeenCalledWith(file)
      expect(mockWebkitRevokeObjectURL).toHaveBeenCalledWith('blob:webkit-url')
      // Restore
      ;(window as any).URL = originalURL
      ;(window as any).webkitURL = undefined
    })

  })
  // #endregion

  // #region files null or first item falsy
  describe('files null or first item falsy', () => {

    test('does nothing when files property is null', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      const input = container.querySelector('input[type="file"]') as HTMLInputElement
      // Execution — set files to null to cover files?.length false branch
      Object.defineProperty(input, 'files', { value: null, configurable: true })
      fireEvent.change(input)
      // Assertions
      expect(onChange).not.toHaveBeenCalled()
    })

    test('does nothing when files[0] is falsy', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      const input = container.querySelector('input[type="file"]') as HTMLInputElement
      // Execution — set files to array with null element
      Object.defineProperty(input, 'files', { value: [null], configurable: true })
      fireEvent.change(input)
      // Assertions
      expect(onChange).not.toHaveBeenCalled()
    })

  })
  // #endregion

  // #region empty files list
  describe('empty files list', () => {

    test('does nothing when files list is empty', () => {
      // Declaration
      const onChange = jest.fn()
      const { container } = render(<ImageUploader name='avatar' onChange={onChange} />)
      const input = container.querySelector('input[type="file"]') as HTMLInputElement
      // Execution — no files
      Object.defineProperty(input, 'files', { value: [], configurable: true })
      fireEvent.change(input)
      // Assertions
      expect(onChange).not.toHaveBeenCalled()
    })

  })
  // #endregion
  describe('name fallback to "file-upload"', () => {

    test('uses "file-upload" as htmlFor and id when name is empty string', () => {
      // Declaration
      const onChange = jest.fn()
      // Execution
      const { container } = render(<ImageUploader name='' onChange={onChange} />)
      // Assertions
      expect(container.querySelector('label')).toHaveAttribute('for', 'file-upload')
      expect(container.querySelector('input[type="file"]')).toHaveAttribute('id', 'file-upload')
    })

  })
  // #endregion

})
