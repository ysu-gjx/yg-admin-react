import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import GlobalAntd from '@/utils/GlobalAntd'
import router from '@/router'

import './App.scss'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff7744'
        }
      }}
    >
      <AntdApp>
        <GlobalAntd />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
