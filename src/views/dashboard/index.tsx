import { useEffect, useState } from 'react'
import { Descriptions, Card, Button } from 'antd'
import type { DescriptionsProps } from 'antd'
import { useStore } from '@/store'
import { formateState, formatNum, formatMoney } from '@/utils'
import api from '@/api'
import { Dashboard } from '@/types/api'
import { useCharts } from '@/hook/useCharts'

import styles from './index.module.scss'
const DashboardFC = () => {
  const userInfo = useStore(state => state.userInfo)
  const [report, setReport] = useState<Dashboard.ReportData>()

  const [lineRef, lineChart] = useCharts()
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()
  const [radarRef, radarChart] = useCharts()
  const descList: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: userInfo.userId
    },
    {
      key: '2',
      label: '邮箱',
      children: userInfo.userEmail
    },
    {
      key: '3',
      label: '状态',
      children: formateState(userInfo.state)
    },
    {
      key: '4',
      label: '手机号',
      children: userInfo.mobile
    },
    {
      key: '5',
      label: '岗位',
      children: userInfo.job
    },
    {
      key: '6',
      label: '部门',
      children: userInfo.deptName
    }
  ]

  const renderLineChart = async () => {
    if (!lineChart) return
    const res = await api.getLineData()
    lineChart?.setOption({
      legend: {
        data: ['订单', '流水']
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      xAxis: {
        data: res.label
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: res.order
        },
        {
          name: '流水',
          type: 'line',
          data: res.money
        }
      ]
    })
  }
  const renderPieChart1 = async () => {
    if (!pieChart1) return
    const res = await api.getPieCityData()
    pieChart1?.setOption({
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          data: res
        }
      ]
    })
  }

  const renderPieChart2 = async () => {
    if (!pieChart2) return
    const res = await api.getPieAgeData()
    pieChart2?.setOption({
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: [50, 180],
          roseType: 'radius',
          data: res
        }
      ]
    })
  }

  const renderRadarChart = async () => {
    if (!radarChart) return

    const res = await api.getRadarData()
    radarChart?.setOption({
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: res.indicator
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: res.data
        }
      ]
    })
  }

  const handlePieRefresh = () => {
    renderPieChart1()
    renderPieChart2()
  }

  useEffect(() => {
    renderLineChart()
    renderPieChart1()
    renderPieChart2()
    renderRadarChart()
  }, [lineChart, pieChart1, pieChart2, radarChart])

  const getReportData = async () => {
    const res = await api.getReportData()
    setReport(res)
  }
  useEffect(() => {
    getReportData()
  }, [])

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img src={userInfo.userImg} className={styles.userImg} />
        <Descriptions title={`欢迎 ${userInfo.userName} 同学，每天都要过的开心！`} items={descList} />;
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}座</div>
        </div>
      </div>

      <div className={styles.chart}>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>

      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={handlePieRefresh}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardFC
