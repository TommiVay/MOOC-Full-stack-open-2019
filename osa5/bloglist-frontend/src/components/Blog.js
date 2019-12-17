import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [showMore, setShow] = useState(false)

  const toggleShowMore = () => {
    setShow(!showMore)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div onClick={() => toggleShowMore()} className='clickable'>
        {showMore ?
          <div>
            <div>{blog.title} by {blog.author}</div>
            <div>{blog.url}</div>
            <div>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></div>
            <div>added by {blog.user.name}</div>
            {blog.user.username === user.username ?
              <button onClick={() => handleRemove(blog)}>remove</button> : <div></div>}
          </div>
          :
          <div>
            {blog.title} by {blog.author}
          </div>
        }
      </div>
    </div>
  )
}

export default Blog