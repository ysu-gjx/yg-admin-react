import { Modal, Form, Tree } from 'antd'
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { IModalRef, IModalProp, IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Role, Menu } from '@/types/api'
import roleApi from '@/api/roleApi'
import api from '@/api'

const SetPermission = forwardRef<IModalRef<Role.RoleItem>, IModalProp>((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [permission, setPermission] = useState<Role.Permission>()

  const open = (type: IAction, data?: Role.RoleItem) => {
    setVisible(true)
    setRoleInfo(data)
    setCheckedKeys(data?.permissionList.checkedKeys || [])
  }

  const getMenuList = async () => {
    const menuList = await api.getMenuList()
    setMenuList(menuList)
  }
  useEffect(() => {
    if (!visible) return
    getMenuList()
  }, [visible])

  useImperativeHandle(
    ref,
    () => ({
      open
    }),
    []
  )

  const handleOk = async () => {
    if (permission) {
      await roleApi.updatePermission(permission)
      message.success('权限设置成功')
      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    setVisible(false)
    setCheckedKeys([])
  }

  const onCheck = (checkedKeysValue: any, item: any) => {
    // 设置选中项 受控组件
    setCheckedKeys(checkedKeysValue)

    // 生成提交符合后台的数据 Role.Permission
    const checkedKeys: string[] = []
    const parentKeys: string[] = []

    item.checkedNodes.map((node: Menu.MenuItem) => {
      if (node.menuType === 2) {
        checkedKeys.push(node._id)
      } else {
        parentKeys.push(node._id)
      }
    })

    setPermission({
      _id: roleInfo?._id as string,
      permissionList: {
        checkedKeys,
        halfCheckedKeys: parentKeys.concat(item.halfCheckedKeys)
      }
    })
  }

  return (
    <Modal
      title='设置权限'
      okText='确认'
      cancelText='取消'
      width={600}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item label='角色名称'>{roleInfo?.roleName}</Form.Item>
        <Form.Item label='权限列表'>
          <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList}
            fieldNames={{ title: 'menuName', key: '_id', children: 'children' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default SetPermission
