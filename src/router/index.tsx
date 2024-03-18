import { createBrowserRouter, Navigate } from 'react-router-dom'
import Welcome from '@/views/welcome'
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Login from '@/views/login'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'
import User from '@/views/system/user'
import Dept from '@/views/system/dept'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/userList',
        element: <User />
      },
      {
        path: '/deptList',
        element: <Dept />
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
])

export default router
