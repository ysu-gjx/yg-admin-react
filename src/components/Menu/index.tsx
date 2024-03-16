import { DesktopOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import styles from './index.module.scss'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface SideMenuProps {
  collapsed: boolean
}

const SideMenu: FC<SideMenuProps> = ({ collapsed }) => {
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />
    },
    {
      label: '用户管理',
      key: '2',
      icon: <UsergroupAddOutlined />,
      children: [
        {
          label: '用户列表',
          key: '3',
          icon: <UserOutlined />
        }
      ]
    }
  ]

  const handleClickLogo = () => {
    navigate('/welcome')
  }
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' className={styles.img} />
        {collapsed ? '' : <span>yg-admin</span>}
      </div>
      <Menu defaultSelectedKeys={['1']} mode='inline' items={items} theme='dark' />
    </div>
  )
}

export default SideMenu
