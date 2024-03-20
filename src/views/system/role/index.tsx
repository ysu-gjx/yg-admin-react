import { Button, Form, Input, Space, Table, TableColumnsType } from 'antd'
import { Role } from '@/types/api'
import { formatDate } from '@/utils'
import { useRef } from 'react'
import { useAntdTable } from 'ahooks'
import api from '@/api/roleApi'
import CreateRole from './CreateRole'
import { IModalRef } from '@/types/modal'
import { message, modal } from '@/utils/GlobalAntd'
import SetPermission from './SetPermission'

const RoleList = () => {
  const [form] = Form.useForm()
  const roleRef = useRef<IModalRef<Role.RoleItem>>(null)
  const permissionRef = useRef<IModalRef<Role.RoleItem>>(null)

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Role.Params) => {
    return api
      .getRoleList({
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
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })

  const columns: TableColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleSetPermission(record)}>
              设置权限
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const handleCreate = () => {
    roleRef.current?.open('create')
  }

  const handleEdit = (record: Role.RoleItem) => {
    roleRef.current?.open('edit', record)
  }
  const handleSetPermission = (record: Role.RoleItem) => {
    permissionRef.current?.open('edit', record)
  }
  const handleDelete = (_id: string) => {
    modal.confirm({
      title: '确认',
      content: `确认删除该角色吗？`,
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        await api.delRole({ _id })
        message.success('删除成功')
        search.submit()
      }
    })
  }
  return (
    <div className='role-list'>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='角色名称' name='roleName'>
          <Input />
        </Form.Item>
        <Form.Item label='角色名称' name='roleName'>
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
          <div className='title'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>

        <Table bordered rowKey='_id' columns={columns} {...tableProps} />
      </div>

      <CreateRole ref={roleRef} update={search.submit} />
      <SetPermission ref={permissionRef} update={search.submit} />
    </div>
  )
}

export default RoleList
