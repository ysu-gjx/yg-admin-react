import { Button, Form, Input, Select, Space, Table, TableColumnsType } from 'antd'
import { Order } from '@/types/api'
import { formatDate, formatMoney } from '@/utils'
import { useRef } from 'react'
import { useAntdTable } from 'ahooks'
import api from '@/api/orderApi'
import { IDetailProp } from '@/types/modal'
import { message, modal } from '@/utils/GlobalAntd'
import CreateOrder from './components/CreateOrder'
import OrderDetail from './components/OrderDetail'

const OrderList = () => {
  const [form] = Form.useForm()
  const orderRef = useRef<IDetailProp>(null)
  const detailRef = useRef<IDetailProp>(null)

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Order.SearchParams) => {
    return api
      .getOrderList({
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
    defaultParams: [{ current: 1, pageSize: 10 }, { state: 1 }]
  })

  const columns: TableColumnsType<Order.OrderItem> = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName'
    },
    {
      title: '下单地址',
      dataIndex: 'startAddress',
      key: 'startAddress',
      render(_, record) {
        return (
          <div>
            <p>开始地址：{record.startAddress}</p>
            <p>结束地址：{record.endAddress}</p>
          </div>
        )
      }
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      }
    },
    {
      title: '订单价格',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      render(orderAmount) {
        return formatMoney(orderAmount)
      }
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '进行中',
          2: '已完成',
          3: '超时',
          4: '取消'
        }[state]
      }
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleDetail(record.orderId)}>
              详情
            </Button>
            <Button type='text' onClick={() => handleMarker(record.orderId)}>
              打点
            </Button>
            <Button type='text' onClick={() => handleRoute(record.orderId)}>
              轨迹
            </Button>
            <Button type='text' danger onClick={() => handleDel(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const handleCreate = () => {
    orderRef.current?.open('create')
  }

  const handleDetail = (id: string) => {
    detailRef.current?.open(id)
  }
  const handleMarker = (id: string) => {}
  const handleRoute = (id: string) => {}
  const handleDel = (_id: string) => {}

  return (
    <div className='order-list'>
      <Form className='search-form' form={form} layout='inline'>
        <Form.Item name='userId' label='订单ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='订单状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>进行中</Select.Option>
            <Select.Option value={2}>已完成</Select.Option>
            <Select.Option value={3}>超时</Select.Option>
            <Select.Option value={4}>取消</Select.Option>
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
          <div className='title'>订单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>

        <Table bordered rowKey='orderId' columns={columns} {...tableProps} />
      </div>

      {/* 创建订单 */}
      <CreateOrder ref={orderRef} update={search.submit} />
      <OrderDetail ref={detailRef} />
    </div>
  )
}

export default OrderList
