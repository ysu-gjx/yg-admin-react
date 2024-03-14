import axios, { AxiosError } from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 15000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: '1E53900BEB862EDD'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Token::' + token
    }
    return { ...config }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const { data, config } = response
    if (data.code === 500001) {
      console.log(data)
      // message
      // window.location.href = '/login'
    } else if (data.code !== 0) {
      if (config.showError === false) {
        return Promise.resolve(data)
      } else {
        return Promise.reject(data)
      }
    }

    return data.data
  },
  error => {
    console.log('error', error)

    return Promise.reject(error.message)
  }
)

export default {
  get(url: string, params = {}) {
    return instance.get(url, { params })
  },
  post(url: string, params = {}) {
    return instance.post(url, params)
  }
}
