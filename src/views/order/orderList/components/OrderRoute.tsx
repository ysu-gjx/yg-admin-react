import { Modal } from 'antd'
import { useImperativeHandle, useState, forwardRef } from 'react'
import { IDetailProp } from '@/types/modal'
import orderApi from '@/api/orderApi'
import { Order } from '@/types/api'
import { message } from '@/utils/AntdGlobal'

const OrderRoute = forwardRef<IDetailProp>((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [trackAni, setTrackAni] = useState<{
    cancel: () => void
  }>()

  useImperativeHandle(ref, () => {
    return {
      open
    }
  })
  // 打开弹框，暴露方法
  const open = async (orderId?: string) => {
    const detail = await orderApi.getOrderDetail(orderId as string)
    if (detail?.route.length) {
      setVisible(true)
      setTimeout(() => {
        renderMap(detail)
      })
    } else {
      message.info('请先完成打点上报')
    }
  }

  const renderMap = (detail: Order.OrderItem) => {
    const map = new window.BMapGL.Map('orderRouteMap')
    map.centerAndZoom(detail.cityName, 12)
    const scaleCtrl = new window.BMapGL.ScaleControl() // 添加比例尺控件
    map.addControl(scaleCtrl)
    const zoomCtrl = new window.BMapGL.ZoomControl() // 添加缩放控件
    map.enableScrollWheelZoom()
    map.addControl(zoomCtrl)

    const path = detail.route || []
    let point = []
    for (let i = 0; i < path.length; i++) {
      point.push(new window.BMapGL.Point(path[i].lng, path[i].lat))
    }

    const ployline = new window.BMapGL.Polyline(point, {
      strokeWeight: '6', // 折线宽度，以像素为单位
      strokeOpacity: '0.8', // 折线透明度
      strokeColor: '#ed6c00' // 折线颜色
    })
    setTimeout(start, 1000)

    function start() {
      const trackAni = new window.BMapGLLib.TrackAnimation(map, ployline, {
        overallView: true,
        tilt: 30,
        duration: 10000,
        delay: 300
      })
      trackAni.start()
      setTrackAni(trackAni)
    }
  }

  const handleCancel = () => {
    setVisible(false)
    trackAni?.cancel()
  }

  return (
    <Modal title='地图轨迹' width={1100} open={visible} onCancel={handleCancel} footer={false}>
      <div id='orderRouteMap' style={{ height: 500 }}></div>
    </Modal>
  )
})

export default OrderRoute
