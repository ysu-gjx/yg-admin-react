import axios, { AxiosError } from 'axios'
import { startLoading, hideLoading } from './loading'
import env from '@/config'
import { Result } from '@/types/api'
import storage from './storage'
import { message } from './GlobalAntd'

const instance = axios.create({
  baseURL: env.baseApi,
  timeout: 15000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: '71D57689E433FCC4'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) startLoading()
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    if (env.mock) {
      config.baseURL = env.mockApi // mock数据
    } else {
      config.baseURL = env.baseApi // 真实数据
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
    hideLoading()
    const data: Result = response.data
    if (data.code === 500001) {
      message.error(data.msg)
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code !== 0) {
      const data: Result = response.data
      if (response.config.showError === false) {
        return Promise.resolve(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }

    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)

    return Promise.reject(error.message)
  }
)

interface IConfig {
  showError?: boolean
  showLoading?: boolean
}

export default {
  get<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(url: string, params = {}, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, params, options)
  }
}
