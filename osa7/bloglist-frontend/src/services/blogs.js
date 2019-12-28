import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = BACKEND_URL + '/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async blog => {
  const config = {
    headers: { authorization: token }
  }
  const updatedBlog = {
    likes: blog.likes + 1
  }
  const url = baseUrl + '/' + blog.id
  const response = await axios.put(url, updatedBlog, config)
  return response.data
}

const remove = async blog => {
  const config = {
    headers: { authorization: token }
  }
  const url = baseUrl + '/' + blog.id
  const response = await axios.delete(url, config)
  return response.data

}

const addComment = async comment => {
  const url = baseUrl + '/' + comment.blog + '/comments'
  const response = await axios.post(url, comment)
  return response.data
}




export default { getAll, setToken, create, update, remove, addComment }