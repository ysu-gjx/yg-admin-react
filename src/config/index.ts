/**
 * 环境配置封装
 */
type ENV = 'dev' | 'stg' | 'prd'

const { host } = window.location

let env: ENV = 'dev'
if (host.indexOf('localhost') > -1) {
  env = 'dev'
} else if (host.includes('stg')) {
  env = 'stg'
} else {
  env = 'prd'
}

// const env = (document.documentElement.dataset.env as ENV) || 'dev'

const config = {
  dev: {
    baseApi: '/api',
    // baseApi: '',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: true,
    // mockApi: '/'
    mockApi: 'https://mock.apifox.com/m1/4166690-0-default'
  },
  stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: true,
    mockApi: 'https://mock.apifox.com/m1/4166690-0-default/'
  },
  prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: true,
    mockApi: 'https://mock.apifox.com/m1/4166690-0-default/'
  }
}

export default {
  env,
  ...config[env]
}
