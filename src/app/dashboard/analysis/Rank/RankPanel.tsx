'use client'

import { cn } from '@/lib/utils'
import { ECOption, useEcharts } from '@/utils/echarts'
import { memo, useMemo } from 'react'

export interface RankData {
  chart?: {
    name: string
    value: number
  }[]
  rank?: {
    name: string
    value: number
  }[]
}

export interface RankPanelProps {
  title: string
  loading?: boolean
  data: RankData | undefined
}

function RankPanel({ title, data }: RankPanelProps) {
  const { chart, rank } = data || {}

  const options = useMemo<ECOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: { type: 'value' },
      xAxis: {
        type: 'category',
        data: chart?.map(item => item.name) || []
      },
      series: [
        {
          type: 'bar',
          data: chart?.map(item => item.value) || []
        }
      ],
      color: ['#2188ff']
    }),
    [chart]
  )

  const { containerRef } = useEcharts(options)

  return (
    <div className="flex h-[300px] w-full">
      <div className="flex-[66.66%] h-full" ref={containerRef}></div>
      <div className="size-full flex-[33.33%] p-[0_32px_32px_72px] text-[14px]">
        <h4 className="mb-[0.5em] font-[500]">{title}</h4>
        <ul className="m-[25px_0_0] p-0 list-none">
          {rank?.map((el, index) => (
            <li key={el.name} className="flex items-center mt-[16px]">
              <span
                className={cn(
                  'size-[20px] text-[12px] mt-[1.5px] mr-[16px] font-[600] leading-[20px] text-center rounded-[20px]',
                  index < 3 ? 'text-[#fff] bg-[rgba(0,0,0,0.85)]' : 'bg-[rgba(0,0,0,0.04)]'
                )}>
                {index + 1}
              </span>
              <span className="flex-1 mr-[8px] overflow-hidden whitespace-nowrap text-ellipsis">
                {el.name}
              </span>
              <span>{el.value.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(RankPanel)
