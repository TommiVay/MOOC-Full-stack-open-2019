import React from 'react'



const Recommended = ({ show, resultUser, resultBooks }) => {
  if (!show) {
    return null
  }
  if (resultBooks.loading || resultUser.loading) {
    return <div>loading...</div>
  }
  const books = resultBooks.data.allBooks
  const user = resultUser.data.me
  const booksByGenre = books.filter(b => b.genres.includes(user.favoriteGenre))

  return (
    <div>
      <h2>Recommendetations</h2>
      books in your favorite genre <b>{user.favoriteGenre}</b>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksByGenre.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default Recommended
