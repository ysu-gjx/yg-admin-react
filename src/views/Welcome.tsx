import { useEffect } from 'react'
import request from '@/utils/request'
const Welcome = () => {
  useEffect(() => {
    request
      .post('/user3', { id: 1234 })
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
