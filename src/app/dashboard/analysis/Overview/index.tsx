'use client'

import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { useMemo } from 'react'
import { CustomCard } from './CustomCard'
import { ECOption, useEcharts } from '@/utils/echarts'
import { Progress } from '@/components/ui/progress'

function useInitVisitChart() {
  const options = useMemo<ECOption>(
    () => ({
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
    }),
    []
  )

  const { chartInstance, containerRef } = useEcharts(options)

  return { chartInstance, containerRef }
}

function usePayloadChart() {
  const options = useMemo<ECOption>(
    () => ({
      color: ['#2188ff'],
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
          show: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: { alignWithLabel: true }
        }
      ],
      yAxis: [{ type: 'value', show: false }],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [100, 52, 200, 334, 390, 330, 220]
        }
      ]
    }),
    []
  )

  const { chartInstance, containerRef } = useEcharts(options)

  return { chartInstance, containerRef }
}

export default function Overview() {
  const { containerRef: visitChartRef } = useInitVisitChart()
  const { containerRef: payloadChartRef } = usePayloadChart()

  return (
    <div className="flex flex-wrap min-w-0 mx-[-12px]">
      <CustomCard
        title="总销售额"
        statText="￥126,560"
        main={
          <div className="h-full flex items-end gap-[16px]">
            <div>
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
        main={<div className="h-full" ref={visitChartRef}></div>}
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
        main={<div className="h-full" ref={payloadChartRef}></div>}
        footer={
          <>
            <span>转化率</span>
            <span className="ml-[8px]">60%</span>
          </>
        }
      />
      <CustomCard
        title="运营活动效果"
        statText="78%"
        main={
          <div className="h-full flex items-center">
            <Progress
              className="w-full"
              value={66}
              innerProps={{ className: 'bg-[linear-gradient(to_right,#108ee9,#87d068)]' }}
            />
            <span className="ml-[8px] text-[14px]">66%</span>
          </div>
        }
        footer={
          <div className="flex items-end gap-[16px]">
            <div>
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
      />
    </div>
  )
}
