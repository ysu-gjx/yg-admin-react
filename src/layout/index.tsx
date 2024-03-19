import React, { useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import { Outlet } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import styles from './index.module.scss'
import api from '@/api'
import { useStore } from '@/store'

const { Content, Sider } = Layout

const App: React.FC = () => {
  const updateUserInfo = useStore(state => state.updateUserInfo)
  const collapsed = useStore(state => state.collapsed)

  const getUserInfo = async () => {
    const userInfo = await api.getUserInfo()
    updateUserInfo(userInfo)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <Watermark content='yg-admin'>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu collapsed={collapsed} />
        </Sider>
        <Layout>
          <NavHeader />
          <Content className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet />
            </div>
            <NavFooter />
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
