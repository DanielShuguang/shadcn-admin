'use client'

import { ECOption } from '@/utils/echarts'
import { InfoIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Skeleton, Tooltip } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { graphic } from 'echarts/core'
import { request } from '@/utils/promise'
import { SearchDataModel } from '@/app/types/dashboard'
import EchartsReact from '@/components/EchartsReact'

function useUserSearchCharts() {
  const [options, setOptions] = useState<ECOption>({})

  const { data, isLoading } = useQuery({
    queryKey: ['user-search-charts'],
    queryFn: () => request<SearchDataModel[]>('/api/dashboard/hotSearch/searchCharts')
  })

  useEffect(() => {
    const xData = data?.data?.map(el => el.date)
    const yData = data?.data?.map(el => el.count)

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
          data: xData
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
          data: yData
        }
      ]
    })
  }, [data])

  return { isLoading, options }
}

function usePerCapitaSearch() {
  const [options, setOptions] = useState<ECOption>({})

  const { data, isLoading } = useQuery({
    queryKey: ['per-capita-charts'],
    queryFn: () => request<SearchDataModel[]>('/api/dashboard/hotSearch/searchCharts')
  })

  useEffect(() => {
    const xData = data?.data?.map(el => el.date)
    const yData = data?.data?.map(el => el.count)

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
          data: xData
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
          data: yData
        }
      ]
    })
  }, [data])

  return { isLoading, options }
}

export default function SearchCharts() {
  const { isLoading: userLoading, options: userOptions } = useUserSearchCharts()

  const { isLoading: perLoading, options: perOptions } = usePerCapitaSearch()

  return (
    <div className="w-full flex gap-[34px]">
      <div className="mb-[24px] flex-[50%]">
        <Skeleton loading={userLoading} paragraph={{ rows: 2 }}>
          <div className="h-[22px] overflow-hidden text-[rgba(0,0,0,0.65)] text-[14px] leading-[24px] whitespace-nowrap text-ellipsis break-words mb-[8px]">
            <span className="inline-flex items-center">
              搜索用户数
              <Tooltip title="指标说明">
                <InfoIcon className="cursor-pointer ml-[8px] leading-1" size="1em" />
              </Tooltip>
            </span>
          </div>

          <EchartsReact className="h-[45px] w-full" options={userOptions} />
        </Skeleton>
      </div>

      <div className="mb-[24px] flex-[50%]">
        <Skeleton loading={perLoading} paragraph={{ rows: 2 }}>
          <div className="h-[22px] overflow-hidden text-[rgba(0,0,0,0.65)] text-[14px] leading-[24px] whitespace-nowrap text-ellipsis break-words mb-[8px]">
            <span className="inline-flex items-center">
              人均搜索次数
              <Tooltip title="指标说明">
                <InfoIcon className="cursor-pointer ml-[8px] leading-1" size="1em" />
              </Tooltip>
            </span>
          </div>

          <EchartsReact className="h-[45px] w-full" options={perOptions} />
        </Skeleton>
      </div>
    </div>
  )
}
