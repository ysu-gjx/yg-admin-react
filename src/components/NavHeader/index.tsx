import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import Breadcrumb from './Breadcrumb'
import { useEffect } from 'react'

const NavHeader = () => {
  const { userInfo, collapsed, updateCollapsed, isDark, updateTheme } = useStore()

  useEffect(() => {
    handleSwitch(isDark)
  }, [])
  const menuList: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：' + userInfo.userEmail
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
  }

  const toggleCollapsed = () => {
    updateCollapsed()
  }
  const handleSwitch = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.dataset.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
    updateTheme(isDark)
    storage.set('isDark', isDark)
  }
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div className={styles.collapsed} onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <Breadcrumb />
      </div>
      <div className={styles.right}>
        <Switch
          checked={isDark}
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
          onChange={handleSwitch}
        />
        <Dropdown menu={{ items: menuList, onClick }} trigger={['click']}>
          <div className={styles.nickName}>{userInfo.userName}</div>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
