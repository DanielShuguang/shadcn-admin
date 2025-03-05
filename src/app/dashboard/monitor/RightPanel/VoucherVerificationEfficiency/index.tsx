import EchartsReact from '@/components/EchartsReact'
import { ECOption } from '@/utils/echarts'
import { request } from '@/utils/promise'
import { useQuery } from '@tanstack/react-query'
import { Card, Skeleton } from 'antd'
import { useEffect, useState } from 'react'

function getGrade(score: number): string {
  if (score >= 80) {
    return '优'
  } else if (score >= 60) {
    return '良'
  } else if (score >= 40) {
    return '中'
  } else if (score >= 20) {
    return '普'
  }
  return '差'
}

export default function VoucherVerificationEfficiency() {
  const [options, setOptions] = useState<ECOption>({})

  const { data, isLoading } = useQuery({
    queryKey: ['voucher-verification-efficiency'],
    queryFn: async () => request<number>('/api/dashboard/voucherVerificationEfficiency')
  })

  useEffect(() => {
    setOptions({
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [0.2, '#6a9afa'],
                [0.4, '#6adbaf'],
                [0.6, '#6c7d9d'],
                [0.8, '#f7c432'],
                [1, '#2a8d23']
              ]
            }
          },
          axisTick: {
            distance: -30,
            length: 0,
            lineStyle: { color: '#fff', width: 2 }
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 5,
            itemStyle: { borderWidth: 10 }
          },
          splitLine: {
            distance: -80,
            length: 30,
            lineStyle: { color: '#fff', width: 4 }
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 12,
            formatter(value) {
              if ([0, 20, 40, 60, 80, 100].includes(value)) {
                return value + ''
              }
              return ''
            }
          },
          detail: {
            valueAnimation: true,
            fontSize: 20,
            color: '#888',
            formatter: getGrade,
            offsetCenter: [0, '70%']
          },
          data: [{ value: data?.data ?? 0 }]
        }
      ]
    })
  }, [data])

  return (
    <Card className="!mb-[24px] min-h-[calc(50%-24px)]" title="券核效率">
      <Skeleton loading={isLoading} paragraph={{ rows: 2 }}>
        <EchartsReact className="h-[194px]" options={options} />
      </Skeleton>
    </Card>
  )
}
