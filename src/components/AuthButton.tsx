import { IAuthLoader } from '@/router/AuthLoader'
import { useRouteLoaderData } from 'react-router-dom'
import { useStore } from '@/store'
import { Button } from 'antd'

export default function AuthButton(props: any) {
  const data = useRouteLoaderData('layout') as IAuthLoader
  const role = useStore(state => state.userInfo.role)

  if (!props.auth) return <Button {...props}>{props.children}</Button>

  // 有相应的权限或者角色是管理员
  if (data.buttonList.includes(props.auth) || role === 1) {
    return <Button {...props}>{props.children}</Button>
  }

  return <></>
}
