import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useStore } from '@/store'
import storage from '@/utils/storage'

const NavHeader = () => {
  const { userInfo, collapsed, updateCollapsed } = useStore()
  const breadcrumbList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]
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
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div className={styles.collapsed} onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <Breadcrumb items={breadcrumbList} />
      </div>
      <div className={styles.right}>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
        <Dropdown menu={{ items: menuList, onClick }} trigger={['click']}>
          <div className={styles.nickName}>{userInfo.userName}</div>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
