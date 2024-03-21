import { createBrowserRouter, Navigate } from 'react-router-dom'
import Welcome from '@/views/welcome'
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Login from '@/views/login'
import Layout from '@/layout'
// import Dashboard from '@/views/dashboard'
// import User from '@/views/system/user'
// import Dept from '@/views/system/dept'
// import Menu from '@/views/system/menu'
// import Role from '@/views/system/role'
// import Order from '@/views/order/orderList'
// import Cluster from '@/views/order/orderCluster'
// import DriverList from '@/views/order/driverList'

import AuthLoader from './AuthLoader'
import { lazyLoad } from './LazyLoad'
import React from 'react'

export const routes = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
        meta: {
          auth: false
        }
      },
      {
        path: '/dashboard',
        element: lazyLoad(React.lazy(() => import('@/views/dashboard')))
      },
      {
        path: '/userList',
        element: lazyLoad(React.lazy(() => import('@/views/system/user')))
      },
      {
        path: '/deptList',
        element: lazyLoad(React.lazy(() => import('@/views/system/dept')))
      },
      {
        path: '/menuList',
        element: lazyLoad(React.lazy(() => import('@/views/system/menu')))
      },
      {
        path: '/roleList',
        element: lazyLoad(React.lazy(() => import('@/views/system/role')))
      },
      {
        path: '/orderList',
        element: lazyLoad(React.lazy(() => import('@/views/order/orderList')))
      },
      {
        path: '/cluster',
        element: lazyLoad(React.lazy(() => import('@/views/order/orderCluster')))
      },
      {
        path: '/driverList',
        element: lazyLoad(React.lazy(() => import('@/views/order/driverList')))
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/403',
    element: <Error403 />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export default createBrowserRouter(routes)
