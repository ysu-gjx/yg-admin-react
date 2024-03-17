import { useEffect, useRef, useState } from 'react'

import * as echarts from 'echarts'

export const useCharts = (): [React.RefObject<HTMLDivElement>, echarts.ECharts | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chart, setChart] = useState<echarts.ECharts>()

  useEffect(() => {
    setChart(echarts.init(chartRef.current))
  }, [])

  return [chartRef, chart]
}
