import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = BACKEND_URL + '/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }