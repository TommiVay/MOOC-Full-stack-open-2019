import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'testi',
    author: 'testiAuthor',
    url: 'testiURL',
    likes: 0,
    user: {
      username: 'username'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('testi')
  expect(component.container).toHaveTextContent('testiAuthor')
  expect(component.container).not.toHaveTextContent('0')
  expect(component.container).not.toHaveTextContent('testiURL')
  expect(component.container).not.toHaveTextContent('username')


})

test('renders other informtion when clicked', () => {
  const blog = {
    title: 'testi',
    author: 'testiAuthor',
    url: 'testiURL',
    likes: 0,
    user: {
      name: 'username'
    }
  }

  const user = {
    username: 'username'
  }


  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.clickable')
  fireEvent.click(div)

  expect(component.container).toHaveTextContent('testi')
  expect(component.container).toHaveTextContent('testiAuthor')
  expect(component.container).toHaveTextContent('0')
  expect(component.container).toHaveTextContent('testiURL')
  expect(component.container).toHaveTextContent('username')

})