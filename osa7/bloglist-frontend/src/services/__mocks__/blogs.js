const blogs = [
  {
    title: 'testi',
    author: 'testiAuthor',
    url: 'testiURL',
    likes: 0,
    user: {
      name: 'username'
    }
  },
  {
    title: 'testi1',
    author: 'testiAuthor1',
    url: 'testiURL1',
    likes: 0,
    user: {
      name: 'username1'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  newToken
}

export default { getAll, setToken }