import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import styles from './index.module.scss'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'

interface SideMenuProps {
  collapsed: boolean
}
type MenuItem = Required<MenuProps>['items'][number]
type IconKeyType = keyof typeof Icons

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    label,
    key,
    icon,
    children
  } as MenuItem
}

// 动态生成菜单图标
function createIcon(name: IconKeyType) {
  if (!name) return <></>
  if (!Icons[name]) return <></>
  return React.createElement(Icons[name] as FC)
}

// 递归生成菜单
const getTreeMenu = (list: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
  list.forEach((item, index) => {
    if (item.menuType === 1 && item.menuState === 1) {
      if (item.buttons) {
        return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon as IconKeyType)))
      }
      treeList.push(
        getItem(
          item.menuName,
          item.path || index,
          createIcon(item.icon as IconKeyType),
          getTreeMenu(item.children || [])
        )
      )
    }
  })

  return treeList
}

const SideMenu: FC<SideMenuProps> = ({ collapsed }) => {
  const navigate = useNavigate()
  const originMenuList: any = useRouteLoaderData('layout')
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { pathname } = useLocation()

  useEffect(() => {
    const list = getTreeMenu(originMenuList.menuList || [])
    setMenuList(list)
    setSelectedKeys([pathname])
  }, [])

  const handleClickLogo = () => {
    navigate('/welcome')
  }
  // 菜单点击
  const handleClickMenu = (key: string) => {
    setSelectedKeys([key])
    navigate(key)
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' className={styles.img} />
        {collapsed ? '' : <span>yg-admin</span>}
      </div>
      <Menu
        style={{ width: collapsed ? 80 : 'auto' }}
        selectedKeys={selectedKeys}
        mode='inline'
        items={menuList}
        theme='dark'
        onClick={({ key }) => handleClickMenu(key)}
      />
    </div>
  )
}

export default SideMenu
