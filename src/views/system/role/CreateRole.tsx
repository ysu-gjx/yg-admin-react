import { Modal, Form, Input } from 'antd'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { IModalRef, IModalProp, IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Role } from '@/types/api'
import api from '@/api/roleApi'

const CreateRole = forwardRef<IModalRef<Role.RoleItem>, IModalProp>((props, ref) => {
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const open = (type: IAction, data?: Role.RoleItem) => {
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

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue()
      }
      if (action === 'create') {
        await api.createRole(params)
        message.success('创建成功')
      } else {
        await api.editRole(params)
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
      title={action === 'create' ? '创建角色' : '编辑角色'}
      okText='确认'
      cancelText='取消'
      width={600}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='roleName' label='角色名称' rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item name='remark' label='备注'>
          <Input.TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default CreateRole
