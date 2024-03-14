import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()

  return (
    <Result
      status='403'
      title='403'
      subTitle='抱歉，您当前没有权限访问此页面。'
      extra={
        <Button type='primary' onClick={() => navigate('/')}>
          回首页
        </Button>
      }
    />
  )
}

export default Index
