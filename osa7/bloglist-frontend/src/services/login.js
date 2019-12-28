import Axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = BACKEND_URL +'/login'

const login = async credentials => {
  const response = await Axios.post(baseUrl, credentials)
  return response.data

}
export default { login }