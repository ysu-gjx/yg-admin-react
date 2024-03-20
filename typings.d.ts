import { AxiosRequestConfig } from 'axios'
import { RouteObject } from 'react-router-dom'

declare module 'axios' {
  interface AxiosRequestConfig {
    showError?: boolean
    showLoading?: boolean
  }
}

declare module 'react-router-dom' {
  interface NonIndexRouteObject {
    meta?: Record<string, any>
  }
}
