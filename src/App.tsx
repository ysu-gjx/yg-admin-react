import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntdApp, theme } from 'antd'
import GlobalAntd from '@/utils/AntdGlobal'
import router from '@/router'
import { useStore } from './store'

import './App.scss'
import '@/styles/theme.scss'

function App() {
  const isDark = useStore(state => state.isDark)
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#ff7744',
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
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
