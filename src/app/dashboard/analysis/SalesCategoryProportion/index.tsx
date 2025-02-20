'use client'

import { SalesCategoryProportionModel } from '@/app/types/dashboard'
import { ECOption, useEcharts } from '@/utils/echarts'
import { request } from '@/utils/promise'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Dropdown, MenuProps, Radio, Skeleton } from 'antd'
import { EllipsisIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

function useSaleCategoryChart(activeType: string) {
  const [options, setOptions] = useState<ECOption>({})

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ['sale-category-chart', activeType],
    queryFn: async () =>
      request<SalesCategoryProportionModel[]>(
        `/api/dashboard/salesCategoryProportion?type=${activeType}`
      )
  })

  useEffect(() => {
    if (!isSuccess) return

    setOptions({
      title: {
        text: '销售额',
        textStyle: { color: 'rgba(0, 0, 0, 0.88)', fontSize: 14, fontWeight: 'normal' }
      },
      color: ['#2289f8', '#68c736', '#7e6af8', '#d786f8', '#f08e54', '#0dcbc5'],
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          data: data?.data || []
        }
      ]
    })
  }, [data, isSuccess])

  const { containerRef } = useEcharts(options)

  return { isLoading, containerRef }
}

export default function SalesCategoryProportion() {
  const [activeType, setActiveType] = useState('all')

  const { containerRef, isLoading } = useSaleCategoryChart(activeType)

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'action-1',
      label: <span>操作一</span>
    },
    {
      key: 'action-2',
      label: <span>操作二</span>
    }
  ]

  return (
    <Card
      className="!mb-[24px]"
      title={
        <div className="flex justify-between">
          <span>销售额类别占比</span>

          <Radio.Group value={activeType} onChange={e => setActiveType(e.target.value)}>
            <Radio.Button value="all">全部渠道</Radio.Button>
            <Radio.Button value="online">线上</Radio.Button>
            <Radio.Button value="offline">门店</Radio.Button>
          </Radio.Group>
        </div>
      }
      extra={
        <Dropdown menu={{ items: dropdownItems }}>
          <EllipsisIcon className="ml-[16px] cursor-pointer" size="14px" />
        </Dropdown>
      }>
      <Skeleton loading={isLoading} paragraph={{ rows: 4 }}>
        <div className="w-full h-[389px]" ref={containerRef}></div>
      </Skeleton>
    </Card>
  )
}
