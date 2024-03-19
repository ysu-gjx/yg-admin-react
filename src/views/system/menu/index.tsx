import { Form, Table, Button, Input, Space, Select } from 'antd'
import type { TableColumnsType } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { Menu } from '@/types/api'
import api from '@/api'
import { formatDate } from '@/utils'
import { IModalRef } from '@/types/modal'
import { message, modal } from '@/utils/GlobalAntd'
import CreateMenu from './CreateMenu'

const MenuList = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<Menu.MenuItem[]>([])
  const menuRef = useRef<IModalRef<Menu.MenuItem | { parentId?: string; orderBy?: number }>>(null)

  const getMenuList = async () => {
    const res = await api.getMenuList(form.getFieldsValue())
    setData(res)
  }
  useEffect(() => {
    getMenuList()
  }, [])

  const columns: TableColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
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
            <Button type='text' onClick={() => handleSubCreate(record)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const handleSearch = () => {
    getMenuList()
  }
  const handleReset = () => {
    form.resetFields()
    handleSearch()
  }
  const handleCreate = () => {
    menuRef.current?.open('create', { orderBy: data.length })
  }

  const handleSubCreate = (record: Menu.MenuItem) => {
    menuRef.current?.open('create', { parentId: record._id, orderBy: record.children?.length })
  }

  const handleEdit = (record: Menu.MenuItem) => {
    menuRef.current?.open('edit', record)
  }

  const handleDelete = (record: Menu.MenuItem) => {
    let text = ''
    if (record.menuType == 1) text = '菜单'
    if (record.menuType == 2) text = '按钮'
    if (record.menuType == 3) text = '页面'
    modal.confirm({
      title: '确认',
      content: `确认删除该${text}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleDelSubmit(record._id)
      }
    })
  }

  // 删除提交
  const handleDelSubmit = async (_id: string) => {
    await api.deleteMenu({ _id })
    message.success('删除成功')
    getMenuList()
  }
  return (
    <div>
      <Form className='search-form' layout='inline' form={form} initialValues={{ menuState: 1 }}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getMenuList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
      </div>

      <CreateMenu ref={menuRef} update={getMenuList} />
    </div>
  )
}

export default MenuList
