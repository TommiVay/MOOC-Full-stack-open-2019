import React from 'react'
const BlogForm = ({
  addBlog,
  title,
  author,
  url,
}) => {
  const noReset = ({ reset, ...rest }) => rest
  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input {...noReset(title)} />
      </div>
      <div>
        Author:
        <input {...noReset(author)} />
      </div>
      <div>
        URL:
        <input {...noReset(url)} />
      </div>
      <button type="submit">Add blog</button>
    </form>
  )
}
export default BlogForm