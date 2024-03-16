import React, { useState, useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import { Outlet } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import styles from './index.module.scss'
import api from '@/api'
import storage from '@/utils/storage'
import { useStore } from '@/store'

const { Content, Sider } = Layout

const App: React.FC = () => {
  const updateUserInfo = useStore(state => state.updateUserInfo)
  const [collapsed, setCollapsed] = useState(false)

  const getUserInfo = async () => {
    const userInfo = await api.getUserInfo()
    console.log(userInfo)
    // storage.set('userInfo', userInfo)
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
