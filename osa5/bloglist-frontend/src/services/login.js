import Axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await Axios.post(baseUrl, credentials)
  return response.data

}
export default { login }