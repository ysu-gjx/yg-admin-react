import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'
import { message } from '@/utils/GlobalAntd'
import { useState } from 'react'
import { useStore } from '@/store'

const LoginFC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const updateToken = useStore(state => state.updateToken)

  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      const data = await api.login(values)
      setLoading(false)
      storage.set('token', data)
      updateToken(data)
      message.success('登陆成功')

      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        window.location.href = params.get('callback') || '/welcome'
      })
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className='title'>系统登陆</div>
        <Form name='normal_login' className='login-form' initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name='userName' rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
          </Form.Item>
          <Form.Item name='userPwd' rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' block htmlType='submit' className='login-form-button' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginFC
