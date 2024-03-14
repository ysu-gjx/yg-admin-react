import { createBrowserRouter, Outlet, useLoaderData, Navigate } from 'react-router-dom'
import Welcome from '@/views/Welcome'
import Error404 from '@/views/404'
import Error403 from '@/views/403'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />
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
