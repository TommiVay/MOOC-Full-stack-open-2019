import React, { useState } from 'react'
import Select from 'react-select';

const Authors = ({ show, result, editAuthor, token }) => {
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState(null)
  if (!show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    await editAuthor({
      variables: { name: selected.value, born }
    })
    setSelected(null)
    setBorn('')
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const options = result.data.allAuthors.map(a => ({
    value: a.name,
    label: a.name
  }
  ))

  const birthYearForm = () => {
    if(!token){
      return null
    }
    return (
      <div>
        <h2>Set birthyear</h2>

        <Select options={options} value={selected} onChange={(option) => setSelected(option)} />
        <form onSubmit={submit}>
          <div>
            born
        <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {birthYearForm()}

    </div>
  )
}

export default Authors