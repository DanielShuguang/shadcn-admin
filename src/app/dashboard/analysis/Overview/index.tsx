'use client'

import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CustomCard } from './CustomCard'
import { ECOption } from '@/utils/echarts'
import { Progress, Row } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { OverviewModel, Payment, Visit } from '@/app/types/dashboard'
import { request } from '@/utils/promise'
import EchartsReact from '@/components/EchartsReact'

function renderCorrectArrow(num = 0) {
  if (num < 0) {
    return <ArrowDownIcon className="inline" size="1em" color="#EB3636" />
  }
  return <ArrowUpIcon className="inline" size="1em" color="#00A854" />
}

function showPositiveNumber(num = 0) {
  if (num < 0) {
    return -num
  }
  return num
}

function useInitVisitChart(data: Visit | undefined) {
  const [options, setOptions] = useState<ECOption>({})

  useEffect(() => {
    setOptions({
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
          data: data?.detail.map(el => el.date)
        }
      ],
      yAxis: [{ type: 'value', show: false }],
      series: [
        {
          name: '访问',
          type: 'line',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: { opacity: 0.8 },
          emphasis: { focus: 'series' },
          data: data?.detail.map(el => el.count)
        }
      ]
    })
  }, [data])

  return { options }
}

function usePayloadChart(data: Payment | undefined) {
  const [options, setOptions] = useState<ECOption>({})

  useEffect(() => {
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
          show: false,
          data: data?.detail.map(el => el.date) || [],
          axisTick: { alignWithLabel: true }
        }
      ],
      yAxis: [{ type: 'value', show: false }],
      series: [
        {
          name: '支付',
          type: 'bar',
          barWidth: '60%',
          data: data?.detail.map(el => el.count) || []
        }
      ]
    })
  }, [data])

  return { options }
}

export default function Overview() {
  const { data, isLoading } = useQuery({
    queryKey: ['overview-data'],
    queryFn: () => request<OverviewModel>('/api/dashboard/overview')
  })

  const { operatingActivities, payment, salesVolume, visit } = data?.data || {}

  const { options: visitChartOpts } = useInitVisitChart(visit)
  const { options: payloadChartOpts } = usePayloadChart(payment)

  return (
    <Row gutter={24}>
      <CustomCard
        loading={isLoading}
        title="总销售额"
        statText={`￥${salesVolume?.total.toLocaleString() || 0}`}
        main={
          <div className="h-full flex items-end gap-[16px]">
            <div>
              <span>周同比</span>
              <span className="ml-[8px] inline-flex items-center">
                <span>{showPositiveNumber(salesVolume?.weekTrend)}%</span>
                {renderCorrectArrow(salesVolume?.weekTrend)}
              </span>
            </div>
            <div>
              <span>日同比</span>
              <span className="ml-[8px] inline-flex items-center">
                {showPositiveNumber(salesVolume?.dayTrend)}%
                {renderCorrectArrow(salesVolume?.dayTrend)}
              </span>
            </div>
          </div>
        }
        footer={
          <>
            <span>日销售额</span>
            <span className="ml-[8px]">￥{salesVolume?.day.toLocaleString() || 0}</span>
          </>
        }
      />
      <CustomCard
        loading={isLoading}
        title="访问量"
        statText={visit?.total.toLocaleString() || 0}
        main={<EchartsReact className="h-full" options={visitChartOpts} />}
        footer={
          <>
            <span>日访问量</span>
            <span className="ml-[8px]">{visit?.day.toLocaleString()}</span>
          </>
        }
      />
      <CustomCard
        loading={isLoading}
        title="支付笔数"
        statText={payment?.total.toLocaleString() || 0}
        main={<EchartsReact className="h-full" options={payloadChartOpts} />}
        footer={
          <>
            <span>转化率</span>
            <span className="ml-[8px]">{payment?.conversionRate}%</span>
          </>
        }
      />
      <CustomCard
        loading={isLoading}
        title="运营活动效果"
        statText={`${operatingActivities?.percent || 0}%`}
        main={
          <div className="h-full flex items-center">
            <Progress
              className="w-full"
              percent={operatingActivities?.percent || 0}
              strokeColor={{ from: '#108ee9', to: '#87d068' }}
            />
          </div>
        }
        footer={
          <div className="flex items-end gap-[16px]">
            <div>
              <span>周同比</span>
              <span className="ml-[8px] inline-flex items-center">
                {showPositiveNumber(operatingActivities?.weekTrend)}%
                {renderCorrectArrow(operatingActivities?.weekTrend)}
              </span>
            </div>
            <div>
              <span>日同比</span>
              <span className="ml-[8px] inline-flex items-center">
                {showPositiveNumber(operatingActivities?.dayTrend)}%
                {renderCorrectArrow(operatingActivities?.dayTrend)}
              </span>
            </div>
          </div>
        }
      />
    </Row>
  )
}
