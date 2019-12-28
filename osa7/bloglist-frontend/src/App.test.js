import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'


describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('login')
    )
    expect(component.container).not.toHaveTextContent('Blogs')
    expect(component.container).not.toHaveTextContent('Create new')
    expect(component.container).not.toHaveTextContent('testi')
    expect(component.container).not.toHaveTextContent('testiAuthor')


  })

  test('if user logged, all blogs are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)

    expect(component.container).toHaveTextContent('Blogs')
    expect(component.container).toHaveTextContent('Create new')
    expect(component.container).toHaveTextContent('testi')
    expect(component.container).toHaveTextContent('testiAuthor')


  })
})