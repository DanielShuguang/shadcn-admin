'use client'

import { useState } from 'react'
import RankPanel from './RankPanel'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Tabs, DatePicker, TimeRangePickerProps, Space, Skeleton } from 'antd'
import dayjs from 'dayjs'
import { request } from '@/utils/promise'
import { SalesDataModel } from '@/app/types/dashboard'

const { RangePicker } = DatePicker

enum DatePresets {
  Today = 'Today',
  ThisWeek = 'This Week',
  ThisMonth = 'This Month',
  ThisYear = 'This Year'
}

function useChangeDateByPresets() {
  const [date, setDate] = useState<TimeRangePickerProps['value']>([dayjs(), dayjs()])

  function changeDateByPreset(preset: DatePresets) {
    const date = dayjs()
    switch (preset) {
      case DatePresets.Today:
        setDate([date, date])
        break
      case DatePresets.ThisWeek:
        setDate([date.add(-date.day()), date])
        break
      case DatePresets.ThisMonth:
        setDate([
          dayjs(new Date(date.year(), date.month(), 1)),
          dayjs(new Date(date.year(), date.month() + 1, 0))
        ])
        break
      case DatePresets.ThisYear:
        setDate([dayjs(new Date(date.year(), 0, 1)), dayjs(new Date(date.year(), 11, 31))])
        break
    }
  }

  return { date, setDate, changeDateByPreset }
}

const datePresets = [
  { label: '今日', value: DatePresets.Today },
  { label: '本周', value: DatePresets.ThisWeek },
  { label: '本月', value: DatePresets.ThisMonth },
  { label: '本年', value: DatePresets.ThisYear }
]

export default function Rank() {
  const { date, setDate, changeDateByPreset } = useChangeDateByPresets()

  const { data, isLoading } = useQuery({
    queryKey: ['salesData', date],
    queryFn: () => request<SalesDataModel>('/api/dashboard/rank')
  })

  const { annualSalesRevenue, salesRank } = data?.data || {}

  return (
    <Card className="!mb-[24px]">
      <Tabs
        className="w-full relative"
        defaultValue="salesVolume"
        items={[
          {
            key: 'salesVolume',
            label: '销售额',
            children: (
              <RankPanel
                title="门店销售额排名"
                loading={isLoading}
                data={{
                  chart: annualSalesRevenue,
                  rank: salesRank?.map(el => ({ name: el.store, value: el.sales }))
                }}
              />
            )
          },
          {
            key: 'visits',
            label: '访问量',
            children: (
              <RankPanel
                loading={isLoading}
                title="门店访问量排名"
                data={{
                  chart: annualSalesRevenue,
                  rank: salesRank?.map(el => ({ name: el.store, value: el.sales }))
                }}
              />
            )
          }
        ]}
        renderTabBar={(props, DefaultTabBar) => (
          <div className="relative">
            <DefaultTabBar {...props} />

            <div className="flex absolute right-0 top-0">
              <Space.Compact className="mr-[15px] max-[992px]:!hidden">
                {datePresets.map(preset => (
                  <Button
                    key={preset.value}
                    type="text"
                    onClick={() => changeDateByPreset(preset.value)}>
                    {preset.label}
                  </Button>
                ))}
              </Space.Compact>
              <RangePicker value={date} onChange={setDate} />
            </div>
          </div>
        )}
      />
    </Card>
  )
}
