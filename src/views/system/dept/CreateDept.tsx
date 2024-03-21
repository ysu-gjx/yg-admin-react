import { Modal, Form, Input, Select, TreeSelect } from 'antd'
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { IModalRef, IModalProp, IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Dept, User } from '@/types/api'
import api from '@/api'

const CreateDept = forwardRef<IModalRef<Dept.DeptItem>, IModalProp>((props, ref) => {
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [userList, setUserList] = useState<User.UserItem[]>([])
  const [form] = Form.useForm()

  const open = (type: IAction, data?: Dept.DeptItem | { parentId: string }) => {
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

  const getDeptList = async () => {
    const res = await api.getDeptList()
    setDeptList(res)
  }
  const getUserList = async () => {
    const res = await api.getAllUserList()
    setUserList(res)
  }

  useEffect(() => {
    if (!visible) return
    getDeptList()
    getUserList()
  }, [visible])

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue()
      }
      if (action === 'create') {
        await api.createDept(params)
        message.success('创建成功')
      } else {
        await api.editDept(params)
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
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item hidden name='_id'>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择上级部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请选择负责人' }]}>
          <Select>
            {userList.map(item => {
              return (
                <Select.Option value={item.userName} key={item._id}>
                  {item.userName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default CreateDept
