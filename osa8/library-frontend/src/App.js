import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import LoginForm from './components/LoginForm'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    author{
      name
    }
    id
    genres
  }
}`

const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: String!, $author: String!, $genres: [String!]!){
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
      ){
        title
        published
        author{
          name
        }
        genres
      }
}`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: String!){
    editAuthor(name: $name, born: $born) {
      name
      born
      id
      bookCount
    }
  }
`


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: handleError
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: handleError
  })

  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const menu = () => {
    if (!token) {
      return (
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>)
    }
    return (
      <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={logout}>logout</button>
      </div>
    )


  }

  return (
    <div>

      <div>
        {menu()}
      </div>

      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }

      <Authors
        show={page === 'authors'}
        result={authors}
        editAuthor={editAuthor}
        token={token}
      />

      <Books
        show={page === 'books'}
        result={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        setPage={(page) => setPage(page)}
      />

    </div>
  )
}

export default App