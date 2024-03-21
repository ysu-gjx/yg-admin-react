import { Button, Form, Input, Select, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import { formatMoney, formatDate } from '@/utils'
import { Order } from '@/types/api'
import { ColumnsType } from 'antd/es/table'
import orderApi from '@/api/orderApi'

export default function DriverList() {
  const [data, setData] = useState<Order.DriverItem[]>([])

  useEffect(() => {
    getDriverList()
  }, [])

  const getDriverList = async () => {
    const data = await orderApi.getDriverList(form.getFieldsValue())
    setData(data.list)
  }

  const columns: ColumnsType<Order.DriverItem> = [
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName',
      fixed: 'left',
      width: 100
    },
    {
      title: '司机信息',
      dataIndex: 'driverInfo',
      fixed: 'left',
      width: 200,
      render(_, record) {
        return (
          <div>
            <p>
              <span>司机ID：</span>
              <span>{record.driverId}</span>
            </p>
            <p>
              <span>手机号码：</span>
              <span>{record.driverPhone}</span>
            </p>
            <p>
              <span>注册城市：</span>
              <span>{record.cityName}</span>
            </p>
            <p>
              <span>会员等级：</span>
              <span>{record.grade}</span>
            </p>
            <p>
              <span>司机等级：</span>
              <span>{record.driverLevel}</span>
            </p>
          </div>
        )
      }
    },
    {
      title: '司机状态',
      dataIndex: 'accountStatus',
      key: 'accountStatus',
      width: 100,
      render(accountStatus: Order.DriverStatus) {
        const statusMap = {
          0: '待认证',
          1: '正常',
          2: '暂时拉黑',
          3: '永久拉黑',
          4: '停止推送'
        }
        return statusMap[accountStatus]
      }
    },
    {
      title: '车辆信息',
      key: 'vehicleInfo',
      width: 260,
      render(_, record) {
        return (
          <div>
            <p>
              <span>车辆号牌：</span>
              <span>{record.carNo}</span>
            </p>
            <p>
              <span>车辆品牌：</span>
              <span>{record.vehicleBrand}</span>
            </p>
            <p>
              <span>车牌名称：</span>
              <span>{record.vehicleName}</span>
            </p>
          </div>
        )
      }
    },
    {
      title: '昨日在线时长',
      dataIndex: 'onlineTime',
      key: 'onlineTime',
      width: 150
    },
    {
      title: '昨日司机流水',
      dataIndex: 'driverAmount',
      key: 'driverAmount',
      width: 150,
      render(driverAmount: number) {
        return formatMoney(driverAmount)
      }
    },
    {
      title: '司机评分',
      dataIndex: 'rating',
      key: 'rating',
      width: 120
    },
    {
      title: '行为分',
      dataIndex: 'driverScore',
      key: 'driverScore',
      width: 120
    },
    {
      title: '昨日推单数',
      dataIndex: 'pushOrderCount',
      key: 'pushOrderCount',
      width: 120
    },
    {
      title: '昨日完单数',
      dataIndex: 'orderCompleteCount',
      key: 'orderCompleteCount',
      width: 120
    },
    {
      title: '加入时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 220,
      render(createTime: string) {
        return formatDate(createTime)
      }
    }
  ]
  const [form] = useForm()

  const handleSearch = () => {
    getDriverList()
  }

  const handleReset = () => {
    form.resetFields()
  }
  return (
    <div className='driver-list'>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='司机名称' name='driverName'>
          <Input placeholder='请输入司机名称' />
        </Form.Item>
        <Form.Item label='司机状态' name='accountStatus'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>待认证</Select.Option>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>暂时拉黑</Select.Option>
            <Select.Option value={3}>永久拉黑</Select.Option>
            <Select.Option value={4}>停止推送</Select.Option>
          </Select>
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
          <div className='title'>司机列表</div>
        </div>
        <Table bordered rowKey='id' columns={columns} dataSource={data} pagination={false} scroll={{ x: 1300 }} />
      </div>
    </div>
  )
}
