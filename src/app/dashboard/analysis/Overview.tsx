'use client'

import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import * as echarts from 'echarts/core'
import { useEffect, useRef } from 'react'
import { CustomCard } from './CustomCard'
import { ECOption } from '@/utils/echarts'
import { useDebounceEffect, useSize } from 'ahooks'

function useInitVisitChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    chartInstance.current = echarts.init(chartRef.current, null, { renderer: 'svg' })
    chartInstance.current.setOption<ECOption>({
      color: ['#d786ff'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: { backgroundColor: '#6a7985' }
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          show: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [{ type: 'value', show: false }],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: { opacity: 0.8 },
          emphasis: { focus: 'series' },
          data: [140, 232, 101, 264, 90, 340, 250]
        }
      ]
    })
  }, [])

  const size = useSize(chartRef)

  useDebounceEffect(
    () => {
      chartInstance.current?.resize()
    },
    [size],
    { wait: 500 }
  )

  return { chartRef }
}

export default function Overview() {
  const { chartRef } = useInitVisitChart()

  return (
    <div className="flex flex-wrap min-w-0 mx-[-12px]">
      <CustomCard
        title="总销售额"
        statText="￥126,560"
        main={
          <div className="h-full flex items-end">
            <div className="mr-[16px]">
              <span>周同比</span>
              <span className="ml-[8px] inline-flex items-center">
                <span>12%</span>
                <ArrowUpIcon className="inline" size="1em" color="#00A854" />
              </span>
            </div>
            <div>
              <span>日同比</span>
              <span className="ml-[8px] inline-flex items-center">
                11%
                <ArrowDownIcon className="inline" size="1em" color="#EB3636" />
              </span>
            </div>
          </div>
        }
        footer={
          <>
            <span>日销售额</span>
            <span className="ml-[8px]">￥12,423</span>
          </>
        }
      />
      <CustomCard
        title="访问量"
        statText="8,846"
        main={<div className="h-full" ref={chartRef}></div>}
        footer={
          <>
            <span>日销售额</span>
            <span className="ml-[8px]">￥12,423</span>
          </>
        }
      />
      <CustomCard
        title="支付笔数"
        statText="6,560"
        main={
          <div className="h-full flex items-end">
            <div className="mr-[16px]">
              <span>周同比</span>
              <span className="ml-[8px]">12%</span>
            </div>
            <div>
              <span>日同比</span>
              <span className="ml-[8px]">11%</span>
            </div>
          </div>
        }
        footer={
          <>
            <span>日销售额</span>
            <span className="ml-[8px]">￥12,423</span>
          </>
        }
      />
      <CustomCard
        title="运营活动效果"
        statText="78%"
        main={
          <div className="h-full flex items-end">
            <div className="mr-[16px]">
              <span>周同比</span>
              <span className="ml-[8px]">12%</span>
            </div>
            <div>
              <span>日同比</span>
              <span className="ml-[8px]">11%</span>
            </div>
          </div>
        }
        footer={
          <>
            <span>日销售额</span>
            <span className="ml-[8px]">￥12,423</span>
          </>
        }
      />
    </div>
  )
}
