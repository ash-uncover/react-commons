/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Avatar } from './Avatar'

jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    ...require('./AvatarSize'),
  }
})

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className }: any) =>
    require('react').createElement('span', { 'data-testid': 'mock-fa-icon', className }),
}))

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faUser: 'faUser',
}))

describe('Avatar', () => {

  // #region render variants
  describe('render content variants', () => {

    test('renders an img element when image prop is provided', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar image='http://example.com/avatar.png' />)
      // Assertions
      expect(container.querySelector('img')).toBeInTheDocument()
    })

    test('renders FontAwesomeIcon with provided icon when icon prop is given', () => {
      // Declaration
      // Execution
      render(<Avatar icon={['fas', 'user']} />)
      // Assertions
      expect(screen.getByTestId('mock-fa-icon')).toBeInTheDocument()
    })

    test('renders initials span (max 2 chars, uppercased) when initials prop is given', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar initials='abc' />)
      // Assertions
      const span = container.querySelector('.ap-avatar__content')
      expect(span).toHaveTextContent('AB')
    })

    test('renders default FontAwesomeIcon when no image/icon/initials provided', () => {
      // Declaration
      // Execution
      render(<Avatar />)
      // Assertions
      expect(screen.getByTestId('mock-fa-icon')).toBeInTheDocument()
    })

  })
  // #endregion

  // #region size modifier
  describe('size modifier', () => {

    test('applies size class for S (default)', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--s')
    })

    test('applies size class for provided size XL', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar size='XL' />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--xl')
    })

    test('removes old size class and adds new when size prop changes', () => {
      // Declaration
      const { container, rerender } = render(<Avatar size='S' />)
      // Execution
      rerender(<Avatar size='L' />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-avatar--s')
      expect(container.firstChild).toHaveClass('ap-avatar--l')
    })

  })
  // #endregion

  // #region interactive modifier
  describe('interactive modifier', () => {

    test('adds interactive class when onClick is provided', () => {
      // Declaration
      const onClick = jest.fn()
      // Execution
      const { container } = render(<Avatar onClick={onClick} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--interactive')
    })

    test('does not add interactive class when onClick is absent', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-avatar--interactive')
    })

    test('removes interactive class when onClick changes to undefined', () => {
      // Declaration
      const onClick = jest.fn()
      const { container, rerender } = render(<Avatar onClick={onClick} />)
      // Execution
      rerender(<Avatar />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-avatar--interactive')
    })

    test('calls onClick handler when clicked', () => {
      // Declaration
      const onClick = jest.fn()
      const { container } = render(<Avatar onClick={onClick} />)
      // Execution
      fireEvent.click(container.firstChild as HTMLElement)
      // Assertions
      expect(onClick).toHaveBeenCalledTimes(1)
    })

  })
  // #endregion

  // #region content-type modifier
  describe('content-type modifier', () => {

    test('adds image class when image is provided', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar image='img.png' />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--image')
    })

    test('adds icon class when icon is provided (no image)', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar icon={['fas', 'user']} />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--icon')
    })

    test('adds initials class when initials is provided (no image/icon)', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar initials='AB' />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--initials')
    })

    test('adds icon class when nothing is provided (fallback)', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar />)
      // Assertions
      expect(container.firstChild).toHaveClass('ap-avatar--icon')
    })

    test('removes old content classes when switching from image to icon', () => {
      // Declaration
      const { container, rerender } = render(<Avatar image='img.png' />)
      // Execution
      rerender(<Avatar icon={['fas', 'star']} />)
      // Assertions
      expect(container.firstChild).not.toHaveClass('ap-avatar--image')
      expect(container.firstChild).toHaveClass('ap-avatar--icon')
    })

  })
  // #endregion

  // #region className and style passthrough
  describe('className and style passthrough', () => {

    test('applies custom className', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar className='my-avatar' />)
      // Assertions
      expect(container.firstChild).toHaveClass('my-avatar')
    })

    test('sets title attribute', () => {
      // Declaration
      // Execution
      const { container } = render(<Avatar title='Profile picture' />)
      // Assertions
      expect(container.firstChild).toHaveAttribute('title', 'Profile picture')
    })

  })
  // #endregion

})
