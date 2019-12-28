import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  // eslint-disable-next-line no-unused-vars
  const noReset = ({ reset, ...rest }) => rest
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>username</label>
        <input {...noReset(username)} data-cy="username" />
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <input {...noReset(password)} data-cy="password" />
      </Form.Field>
      <Button type="submit" >login</Button>
    </Form>
  )
}

LoginForm.protoTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm