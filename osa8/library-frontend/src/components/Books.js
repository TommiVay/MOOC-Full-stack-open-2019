import React, { useState } from 'react'



const Books = ({ show, result }) => {
  const [genre, setGenre] = useState('all')
  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  let books = result.data.allBooks
  const allGenres = books.map(b => b.genres)
  const uniqueGenres = [...new Set(allGenres.flat())]
  if (genre !== 'all') {
    books = books.filter(b => b.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>
      in genre <b>{genre}</b>
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
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setGenre('all')}>all</button>
      {uniqueGenres.map(g =>
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      )}
    </div>
  )
}

export default Books