import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import Users from './components/Users'
import User from './components/User'
import { initializeUsers } from './reducers/userReducer'
import MenuBar from './components/Menu'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { Container, Table, Button, Divider, Menu, Header, Segment } from 'semantic-ui-react'


const mapDispatchtoProps = {
  setNotification,
  initializeUsers
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

function App(props) {
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [loginVisible, setLoginVisible] = useState(false)
  const [newComment, setNewComment] = useState('')
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs))
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



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
      props.setNotification({ message: 'Wrong credentials', type: 'error' }, 5000)

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
    props.setNotification({ message: ` a new blog ${title.value} by ${author.value} added`, type: 'success' }, 5000)
    setBlogs(blogs.concat(data))
    author.reset()
    title.reset()
    url.reset()

  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const handleComment = async (blog) => {
    const comment = {
      content: newComment,
      blog: blog.id
    }
    await blogService.addComment(comment)
    setNewComment('')
    blog.comments.push(comment)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : blog))
  }

  const handleLike = (blog) => {
    blogService.update(blog)
    blog.likes++
    setBlogs(blogs.map(b => b.id !== blog.id ? b : blog))
  }

  const handleBlogRemove = (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog)
      setBlogs(blogs.filter(b => b.title !== blog.title))
    }
  }


  const blogRows = () => {
    return (
      <Table striped celled>
        <Table.Body>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Table.Row key={blog.id}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`} data-cy="singleBlog" >{blog.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  by {blog.author}
                </Table.Cell>
              </Table.Row>
            )}
        </Table.Body>
      </Table>
    )
  }
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

  const blogById = (id) =>
    blogs.find(b => b.id === id)


  const userById = (id) =>
    props.users.find(u => u.id === id)



  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={() => setLoginVisible(true)}>log in</Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
          />
          <Divider />
          <Button onClick={() => setLoginVisible(false)}>cancel</Button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <Container>
        <Menu inverted>
          <Menu.Item link>
            <h2>Login to application</h2>
          </Menu.Item>
        </Menu>
        <Notification />
        {loginForm()}
      </Container>
    )
  } else {
    return (
      <Container>
        <Router>
          <MenuBar user={user} handleLogout={handeLogout} />
          <div>
            <Route exact path="/users" render={() =>
              <div>
                <Users blogs={blogs} />
              </div>
            } />
            <Route exact path="/" render={() =>
              <div>
                <Header as='h2' attached='top'>
                  Create new
                </Header>
                <Segment attached>
                  <Notification />
                  {blogForm()}
                </Segment>
                <Header as='h2' attached='top'>
                  Blogs
                </Header>
                <Segment attached>
                  {blogRows()}
                </Segment>
              </div>
            } />
            <Route exact path="/users/:id" render={({ match }) =>
              <div>
                <User user={userById(match.params.id)} />
              </div>
            } />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <div>
                <Blog blog={blogById(match.params.id)} user={user} handleLike={handleLike}
                  handleRemove={handleBlogRemove} handleChange={handleCommentChange} onSubmit={handleComment} value={newComment} />
              </div>
            } />
          </div>
        </Router>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(App)


