import { useEffect } from 'react'
import request from '@/utils/request'
const Welcome = () => {
  useEffect(() => {
    request
      .post('/users/login', {
        userName: 'JackMa',
        userPwd: '123456'
      })
      .then(res => {
        console.log('res', res)
      })
      .catch(err => {
        console.log('err', err)
      })
  }, [])
  return <div>Welcome</div>
}

export default Welcome
