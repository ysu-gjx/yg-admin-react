import { Form, Table, Button, Input, Space } from 'antd'
import type { TableColumnsType } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { Dept } from '@/types/api'
import api from '@/api'
import { formatDate } from '@/utils'
import CreateDept from './CreateDept'
import { IModalRef } from '@/types/modal'
import { message, modal } from '@/utils/AntdGlobal'

const DeptList = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<Dept.DeptItem[]>([])
  const deptRef = useRef<IModalRef<Dept.DeptItem | { parentId: string }>>(null)

  const getDeptList = async () => {
    const res = await api.getDeptList(form.getFieldsValue())
    setData(res)
  }
  useEffect(() => {
    getDeptList()
  }, [])

  const columns: TableColumnsType<Dept.DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const handleSearch = () => {
    getDeptList()
  }
  const handleReset = () => {
    form.resetFields()
    handleSearch()
  }
  const handleCreate = () => {
    deptRef.current?.open('create')
  }

  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }

  const handleEdit = (record: Dept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }

  const handleDel = (id: string) => {
    modal.confirm({
      title: '确认',
      content: '确认删除该部门吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleDelSubmit(id)
      }
    })
  }

  // 删除提交
  const handleDelSubmit = async (_id: string) => {
    await api.delDept({ _id })
    message.success('删除成功')
    getDeptList()
  }
  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item name='deptName' label='部门名称'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}>
              搜索
            </Button>
            <Button type='default' onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' dataSource={data} columns={columns} pagination={false} />
      </div>

      <CreateDept ref={deptRef} update={getDeptList} />
    </div>
  )
}

export default DeptList
