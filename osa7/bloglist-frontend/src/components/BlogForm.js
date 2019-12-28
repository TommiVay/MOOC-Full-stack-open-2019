import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = ({
  addBlog,
  title,
  author,
  url,
}) => {
  // eslint-disable-next-line no-unused-vars
  const noReset = ({ reset, ...rest }) => rest
  return (
    <Form onSubmit={addBlog}>
      <Form.Field>
        <label>Title:</label>
        <input {...noReset(title)} data-cy="title" />
      </Form.Field>
      <Form.Field>
        <label>Author:</label>
        <input {...noReset(author)} data-cy="author" />
      </Form.Field>
      <Form.Field>
        <label>URL:</label>
        <input {...noReset(url)} data-cy="url" />
      </Form.Field>
      <Button type="submit">Add blog</Button>
    </Form>
  )
}
export default BlogForm