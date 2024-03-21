import { IAuthLoader } from '@/router/AuthLoader'
import { Breadcrumb } from 'antd'
import { useRouteLoaderData, useLocation } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { findTreeNode } from '@/utils'

const BreadcrumbFC = () => {
  const { pathname } = useLocation()
  const [breadList, setBreadList] = useState<(string | ReactNode)[]>([])

  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader

  const list = findTreeNode(data.menuList, pathname, [])

  useEffect(() => {
    setBreadList([<a href='/welcome'> 首页</a>, ...list])
  }, [pathname])

  return <Breadcrumb items={breadList.map(item => ({ title: item }))} style={{ marginLeft: 10 }} />
}

export default BreadcrumbFC
