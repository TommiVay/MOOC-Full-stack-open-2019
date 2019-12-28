import React from 'react'
import { Header, Segment } from 'semantic-ui-react'


const User = ({ user }) => {
  if (user === undefined) {
    return null
  }

  return (
    <div>
      <Header as='h2' attached='top'>
        {user.username}
      </Header>
      <Segment attached>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(b =>
            <li key={b.id}>{b.title}</li>
          )}
        </ul>
      </Segment>
    </div>
  )
}

export default User