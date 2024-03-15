import { Spin } from 'antd'
import './loading.scss'
export default function Loading({ tip = 'Loading...' }: { tip?: string }) {
  return (
    <Spin tip={tip} size='large' className='request-loading'>
      <div></div>
    </Spin>
  )
}
