import { Modal } from 'antd'
import { useImperativeHandle, useState, forwardRef } from 'react'
import { IDetailProp } from '@/types/modal'
import orderApi from '@/api/orderApi'
import { Order } from '@/types/api'
import { message } from '@/utils/AntdGlobal'

type MarkerType = { lng: string; lat: string }

const OrderMarker = forwardRef<IDetailProp>((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [markers, setMarkers] = useState<(MarkerType & { id: number })[]>([])

  useImperativeHandle(ref, () => {
    return {
      open
    }
  })
  // 打开弹框，暴露方法
  const open = async (orderId?: string) => {
    setOrderId(orderId as string)
    setVisible(true)
    const detail = await orderApi.getOrderDetail(orderId as string)
    renderMap(detail)
  }

  const renderMap = (detail: Order.OrderItem) => {
    const map = new window.BMapGL.Map('markerMap')
    map.centerAndZoom(detail.cityName, 12)
    const scaleCtrl = new window.BMapGL.ScaleControl() // 添加比例尺控件
    map.addControl(scaleCtrl)
    const zoomCtrl = new window.BMapGL.ZoomControl() // 添加缩放控件
    map.enableScrollWheelZoom()
    map.addControl(zoomCtrl)
    detail.route?.map(item => {
      createMarker(map, item.lng, item.lat)
    })

    // 绑定事件
    map.addEventListener('click', (e: any) => {
      createMarker(map, e.latlng.lng, e.latlng.lat)
    })
  }

  const createMarker = (map: any, lng: string, lat: string) => {
    const id = Math.random()
    const marker = new window.BMapGL.Marker(new window.BMapGL.Point(lng, lat))
    markers.push({ lng, lat, id })

    const markMenu = new window.BMapGL.ContextMenu()
    markMenu.addItem(
      new window.BMapGL.MenuItem('删除', () => {
        map.removeOverlay(marker)
        const index = markers.findIndex(item => item.id === marker.id)
        markers.splice(index, 1)
        setMarkers([...markers])
      })
    )

    setMarkers([...markers])
    marker.addContextMenu(markMenu)
    map.addOverlay(marker)
  }

  const handleOk = async () => {
    await orderApi.updateOrderInfo({
      orderId,
      route: markers
    })
    message.success('打点成功')
    handleCancel()
  }
  const handleCancel = () => {
    setVisible(false)
    setMarkers([])
  }

  return (
    <Modal
      title='地图打点'
      width={1100}
      open={visible}
      onOk={handleOk}
      okText='确定'
      cancelText='取消'
      onCancel={handleCancel}
    >
      <div id='markerMap' style={{ height: 500 }}></div>
    </Modal>
  )
})

export default OrderMarker
