import axios from 'axios'
import { toast } from 'react-toastify'

const httpClient = axios.create({
  baseURL: 'http://indefinitacodicis.com:9091/tickets',
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      if (error.code == 'NETWORK_ERROR' || error.code == 'ECONNABORTED') {
        toast('Error de conexión')
      } else if (error.message == 'Network Error') {
        toast('Error de red')
      } else {
        toast('Oops!, Ah ocurrido un error')
      }
    } else return Promise.reject(error)
  }
)

export { httpClient }
