import React, { useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import styles from './index.module.scss'
import api from '@/api'
import { useStore } from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { routes } from '@/router'

const { Content, Sider } = Layout

const App: React.FC = () => {
  const updateUserInfo = useStore(state => state.updateUserInfo)
  const collapsed = useStore(state => state.collapsed)
  const originMenuList = useRouteLoaderData('layout') as IAuthLoader
  const { pathname } = useLocation()

  const getUserInfo = async () => {
    const userInfo = await api.getUserInfo()
    updateUserInfo(userInfo)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  // 权限判断
  const route = searchRoute(pathname, routes)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    const staticPath = ['/welcome', '/403', '/404']
    if (!originMenuList.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }

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
