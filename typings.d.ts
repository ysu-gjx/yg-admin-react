import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    showError?: boolean
    showLoading?: boolean
  }
}
