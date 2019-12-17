import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'

function App() {
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author= useField('text')
  const url= useField('text')
  const [notification, setNotification] = useState({
    message: null
  })
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = React.createRef()

  useEffect(() => {
    const fetchInitialBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchInitialBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()

    } catch (exception) {
      notify('Wrong username or password', 'error')
    }
  }

  const handeLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    const data = await blogService.create(blogObject)

    notify(`a new blog ${title.value} by ${author.value} added`)
    setBlogs(blogs.concat(data))
    author.reset()
    title.reset()
    url.reset()

  }

  const handleLike = (blog) => {
    blogService.update(blog)
    blog.likes++
  }

  const handleBlogRemove = (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`))
      blogService.remove(blog)
    setBlogs(blogs.filter(b => b.title !== blog.title))
  }

  const blogRows = () => blogs
    .sort((a, b) => b.likes - a.likes)
    .map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleBlogRemove}
        user={user} />
    )
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        addBlog={addBlog}
        title={title}
        author={author}
        url={url}
      />
    </Togglable>
  )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to applicaton</h2>
        <Notification notification={notification} />
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handeLogout}>Logout</button></p>
        <h2>Create new</h2>
        <Notification notification={notification} />
        {blogForm()}
        {blogRows()}
      </div>
    )
  }

}

export default App

