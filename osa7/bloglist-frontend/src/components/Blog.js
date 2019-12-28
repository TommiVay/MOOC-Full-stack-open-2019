import React from 'react'

import { Form, Button, Header, Segment } from 'semantic-ui-react'



const Blog = ({ blog, user, handleLike, handleRemove,
  value, onSubmit, handleChange }) => {

  if (blog === undefined) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(blog)
  }

  return (
    <div>
      <Header as='h2' attached='top'>
        {blog.title} by {blog.author}
      </Header>
      <Segment attached>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <Button data-cy="likeButton" onClick={() => handleLike(blog)}>like</Button></div>
        <div>added by {blog.user.name}</div>
        {blog.user.username === user.username ?
          <Button onClick={() => handleRemove(blog)}>remove</Button> : <div></div>}
        <h4>Comments</h4>
        <Form onSubmit={handleSubmit}>
          <input
            value={value}
            onChange={handleChange}
            data-cy="commentInput" />
          <Button type="submit">add comment</Button>
        </Form>
        <ul>
          {blog.comments.map(c =>
            <li key={blog.id + c.id}>{c.content}</li>)}
        </ul>
      </Segment>
    </div>
  )
}

export default Blog