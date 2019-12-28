import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


test('renders content', () => {
  const blog = {
    title: 'testi',
    author: 'testiAuthor',
    likes: 0
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('testi')
  expect(component.container).toHaveTextContent('testiAuthor')
  expect(component.container).toHaveTextContent('0')

})

test('clicking like button twice calls evend handler twice', async () => {
  const blog = {
    title: 'testi',
    author: 'testiAuthor',
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})