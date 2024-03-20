import { Form, Input, Button, Select, Space, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { formatDate } from '@/utils'
import { User } from '@/types/api'
import { useState, useRef } from 'react'
import api from '@/api'
import { IModalRef } from '@/types/modal'
import CreateUser from './CreateUser'
import { modal, message } from '@/utils/GlobalAntd'
import { useAntdTable } from 'ahooks'
import AuthButton from '@/components/AuthButton'

const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: User.Params) => {
  return api
    .getUserList({
      ...formData,
      pageNum: current,
      pageSize
    })
    .then(res => {
      return {
        total: res.page.total,
        list: res.list
      }
    })
}
const UserFC = () => {
  const [form] = Form.useForm()
  const userRef = useRef<IModalRef>(null)
  const [userIds, setUserIds] = useState<number[]>([])
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })

  // 创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }
  // 编辑用户
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', { ...record })
  }

  // 删除用户公共方法
  const handleUserDelSubmit = async (ids: number[]) => {
    try {
      await api.delUser({
        userIds: ids
      })
      message.success('删除成功')
      setUserIds([])
      search.reset()
    } catch (e) {
      console.log(e)
    }
  }

  // 删除用户
  const handleDel = (userId: number) => {
    modal.confirm({
      title: '删除确认',
      content: '确认删除该用户吗？',
      onOk: () => {
        handleUserDelSubmit([userId])
      }
    })
  }
  // 批量删除用户
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    modal.confirm({
      title: '删除确认',
      content: '确认删除该批用户吗？',
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }

  const columns: TableColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      render(record: User.UserItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='user-list'>
      <Form className='search-form' layout='inline' form={form} initialValues={{ state: 1 }}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <AuthButton type='primary' auth='user@create' onClick={handleCreate}>
              新增
            </AuthButton>
            <Button type='primary' danger onClick={handlePatchConfirm}>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey='userId'
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: selectedRowKeys => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
          columns={columns}
          {...tableProps}
        />
      </div>

      <CreateUser ref={userRef} update={search.reset} />
    </div>
  )
}

export default UserFC
