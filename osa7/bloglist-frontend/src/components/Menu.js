import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

const MenuBar = ({ user, handleLogout }) => {
  return (
    <div>
      <Menu inverted>
        <Menu.Item >
          <h2>Blog app</h2>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/">Blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item>
          {user.name} logged in
        </Menu.Item>
        <Menu.Item>
          <Button onClick={handleLogout}>Logout</Button>
        </Menu.Item>
      </Menu>
    </div>
  )
}


export default MenuBar