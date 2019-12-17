import React from 'react'
import PropTypes from 'prop-types'



const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  const noReset = ({ reset, ...rest }) => rest
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input {...noReset(username)} />
      </div>
      <div>
        password
        <input {...noReset(password)} />
      </div>
      <button type="submit">login</button>
    </form>
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