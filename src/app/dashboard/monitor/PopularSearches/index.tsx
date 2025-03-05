'use client'

import { PopularSearchesModel } from '@/app/types/dashboard'
import EchartsReact from '@/components/EchartsReact'
import { ECOption } from '@/utils/echarts'
import { request } from '@/utils/promise'
import { stringToColor } from '@/utils/string'
import { useQuery } from '@tanstack/react-query'
import { Card, Skeleton } from 'antd'
import { useEffect, useState } from 'react'

export default function PopularSearches() {
  const [options, setOptions] = useState<ECOption>({})

  const { data, isLoading } = useQuery({
    queryKey: ['popular-searches'],
    queryFn: async () => request<PopularSearchesModel[]>('/api/dashboard/popularSearches'),
    select: res => res.data || []
  })

  useEffect(() => {
    const list =
      data?.map(item => ({
        name: item.city,
        value: item.count,
        textStyle: { color: stringToColor(item.city, { complex: true }) }
      })) || []

    setOptions({
      series: [
        {
          type: 'wordCloud',
          sizeRange: [15, 80],
          rotationRange: [0, 0],
          rotationStep: 45,
          gridSize: 8,
          shape: 'circle',
          width: '100%',
          height: '100%',
          data: list
        }
      ]
    })
  }, [data])

  return (
    <Card className="h-full" title="热门搜索">
      <Skeleton loading={isLoading} paragraph={{ rows: 2 }}>
        <EchartsReact className="h-[160px]" options={options} />
      </Skeleton>
    </Card>
  )
}
