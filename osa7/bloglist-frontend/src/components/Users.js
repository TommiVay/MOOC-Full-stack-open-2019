import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Header, Segment } from 'semantic-ui-react'

const Users = ({ users, blogs }) => {
  return (
    <div>
      <Header as='h2' attached='top'>
        Users
      </Header>
      <Segment attached>
        <Table striped celled>
          <Table.Body>
            {users.map(user =>
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Link to={`/users/${user.id}`} data-cy="singleUser">{user.username}</Link>
                </Table.Cell>
                <Table.Cell> blogs: {blogs.filter(b =>
                  b.user.id === user.id).length}
                </Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}
export default connect(mapStateToProps)(Users)