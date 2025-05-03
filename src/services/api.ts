import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'X-MAL-CLIENT-ID': 'db25373c8fbdd48c4107afc5ec15b1ce', // set default header globally
  },
})

export default api
