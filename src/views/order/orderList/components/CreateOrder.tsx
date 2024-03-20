import { Modal, Form, Input, Row, Col, DatePicker, Select } from 'antd'
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { IDetailProp, IModalProp } from '@/types/modal'
import { message } from '@/utils/GlobalAntd'
import { Order } from '@/types/api'
import api from '@/api/orderApi'

const CreateOrder = forwardRef<IDetailProp, IModalProp>((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [cityList, setCityList] = useState<Order.DictItem[]>([])
  const [vehicleList, setVehicleList] = useState<Order.DictItem[]>([])

  useEffect(() => {
    getInitData()
  }, [])
  // 初始化城市列表、车型列表
  const getInitData = async () => {
    const cityList = await api.getCityList()
    const vehicleList = await api.getVehicleList()
    setCityList(cityList)
    setVehicleList(vehicleList)
  }
  const open = () => {
    setVisible(true)
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
      await api.createOrder(params)
      message.success('创建成功')

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
      title='cc'
      okText='确认'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout='horizontal' labelAlign='right' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Row>
          <Col span={12}>
            <Form.Item name='cityName' label='城市名称' rules={[{ required: true, message: '请选择城市名称' }]}>
              <Select placeholder='请选择城市名称'>
                {cityList.map(item => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='vehicleName' label='车型' rules={[{ required: true, message: '请选择车型' }]}>
              <Select placeholder='请选择车型名称'>
                {vehicleList.map(item => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name='userName' label='用户名称' rules={[{ required: true, message: '请输入用户名称' }]}>
              <Input placeholder='请输入用户名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='mobile' label='手机号'>
              <Input placeholder='请输入下单手机号' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name='startAddress' label='起始地址'>
              <Input placeholder='请输入起始地址' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='endAddress' label='结束地址'>
              <Input placeholder='请输入结束地址' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name='orderAmount' label='下单金额' rules={[{ required: true, message: '请输入下单金额' }]}>
              <Input type='number' placeholder='请输入下单金额' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='userPayAmount' label='支付金额' rules={[{ required: true, message: '请输入支付金额' }]}>
              <Input type='number' placeholder='请输入支付金额' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name='driverName' label='司机名称' rules={[{ required: true, message: '请输入司机名称' }]}>
              <Input placeholder='请输入司机名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='driverAmount' label='司机金额' rules={[{ required: true, message: '请输入司机金额' }]}>
              <Input type='number' placeholder='请输入司机金额' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name='payType' label='支付方式'>
              <Select placeholder='请选择支付方式'>
                <Select.Option value={1}>微信</Select.Option>
                <Select.Option value={2}>支付宝</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='state' label='订单状态'>
              <Select placeholder='请选择订单状态'>
                <Select.Option value={1}>进行中</Select.Option>
                <Select.Option value={2}>已完成</Select.Option>
                <Select.Option value={3}>超时</Select.Option>
                <Select.Option value={4}>取消</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name='useTime' label='用车时间'>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='endTime' label='结束时间'>
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

export default CreateOrder
