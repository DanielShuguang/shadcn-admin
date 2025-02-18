'use client'

import { ECOption, useEcharts } from '@/utils/echarts'
import { InfoIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { mockSearchCharts } from './mock'
import { Spin, Tooltip } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { graphic } from 'echarts/core'
import dayjs from 'dayjs'

function useUserSearchCharts() {
  const [options, setOptions] = useState<ECOption>({})

  const { data, isLoading } = useQuery({
    queryKey: ['user-search-charts'],
    queryFn: mockSearchCharts
  })

  const { containerRef } = useEcharts(options)

  useEffect(() => {
    if (!data) return

    setOptions({
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
          boundaryGap: false,
          show: false,
          data: data.map((_, index) =>
            dayjs()
              .add(index - data.length, 'day')
              .format('yyyy-MM-dd')
          )
        }
      ],
      yAxis: [{ type: 'value', show: false }],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2188ff' },
              { offset: 1, color: '#f0f5fe' }
            ])
          },
          emphasis: { focus: 'series' },
          data
        }
      ]
    })
  }, [data])

  return { containerRef, isLoading }
}

function usePerCapitaSearch() {
  const [options, setOptions] = useState<ECOption>({})

  const { data, isLoading } = useQuery({
    queryKey: ['per-capita-charts'],
    queryFn: mockSearchCharts
  })

  const { containerRef } = useEcharts(options)

  useEffect(() => {
    if (!data) return

    setOptions({
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
          boundaryGap: false,
          show: false,
          data: data.map((_, index) =>
            dayjs()
              .add(index - data.length, 'day')
              .format('yyyy-MM-dd')
          )
        }
      ],
      yAxis: [{ type: 'value', show: false }],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2188ff' },
              { offset: 1, color: '#f0f5fe' }
            ])
          },
          emphasis: { focus: 'series' },
          data
        }
      ]
    })
  }, [data])

  return { containerRef, isLoading }
}

export default function SearchCharts() {
  const { containerRef: userRef, isLoading: userLoading } = useUserSearchCharts()

  const { containerRef: perRef, isLoading: perLoading } = usePerCapitaSearch()

  return (
    <div className="w-full flex gap-[34px]">
      <div className="mb-[24px] flex-[50%]">
        <div className="h-[22px] overflow-hidden text-[rgba(0,0,0,0.65)] text-[14px] leading-[24px] whitespace-nowrap text-ellipsis break-words mb-[8px]">
          <span className="inline-flex items-center">
            搜索用户数
            <Tooltip title="指标说明">
              <InfoIcon className="cursor-pointer ml-[8px] leading-1" size="1em" />
            </Tooltip>
          </span>
        </div>

        <Spin spinning={userLoading}>
          <div className="h-[45px] w-full" ref={userRef}></div>
        </Spin>
      </div>

      <div className="mb-[24px] flex-[50%]">
        <div className="h-[22px] overflow-hidden text-[rgba(0,0,0,0.65)] text-[14px] leading-[24px] whitespace-nowrap text-ellipsis break-words mb-[8px]">
          <span className="inline-flex items-center">
            人均搜索次数
            <Tooltip title="指标说明">
              <InfoIcon className="cursor-pointer ml-[8px] leading-1" size="1em" />
            </Tooltip>
          </span>
        </div>

        <Spin spinning={perLoading}>
          <div className="h-[45px] w-full" ref={perRef}></div>
        </Spin>
      </div>
    </div>
  )
}
