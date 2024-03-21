import { Modal, Form, Input, Select, TreeSelect, Radio, InputNumber } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { IModalRef, IModalProp, IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Menu } from '@/types/api'
import api from '@/api'

const CreateMenu = forwardRef<IModalRef<Menu.MenuItem>, IModalProp>((props, ref) => {
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [form] = Form.useForm()

  const open = (type: IAction, data?: Menu.MenuItem | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }
  useImperativeHandle(
    ref,
    () => ({
      open
    }),
    []
  )

  const getMenuList = async () => {
    const res = await api.getMenuList()
    setMenuList(res)
  }

  useEffect(() => {
    if (!visible) return
    getMenuList()
  }, [visible])

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue()
      }
      if (action === 'create') {
        await api.createMenu(params)
        message.success('创建成功')
      } else {
        await api.editMenu(params)
        message.success('编辑成功')
      }
      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      okText='确认'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right' initialValues={{ menuType: 1 }}>
        <Form.Item hidden name='_id'>
          <Input />
        </Form.Item>
        <Form.Item label='父级菜单' name='parentId'>
          <TreeSelect
            placeholder='请选择父级菜单'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: '_id' }}
            treeData={menuList}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType' rules={[{ required: true, message: '请选择菜单类型' }]}>
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
            <Radio value={3}>页面</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.menuType !== curValues.menuType}>
          {() => {
            return form.getFieldValue('menuType') === 2 ? (
              <Form.Item label='权限标识' name='menuCode'>
                <Input placeholder='请输入权限标识' />
              </Form.Item>
            ) : (
              <>
                <Form.Item label='菜单图标' name='icon'>
                  <Input placeholder='请输入菜单图标' />
                </Form.Item>
                <Form.Item label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址' />
                </Form.Item>
                <Form.Item label='组件名称' name='component'>
                  <Input placeholder='请输入组件名称' />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>

        <Form.Item label='排序' name='orderBy' tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined /> }}>
          <InputNumber placeholder='请输入排序值' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default CreateMenu
