'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/DatePicker/DatePickerWithRange'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import RankPanel from './RankPanel'
import { getSalesData } from './mock'
import { useQuery } from '@tanstack/react-query'

enum DatePresets {
  Today = 'Today',
  ThisWeek = 'This Week',
  ThisMonth = 'This Month',
  ThisYear = 'This Year'
}

function useChangeDateByPresets() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  })

  function changeDateByPreset(preset: DatePresets) {
    const date = new Date()
    switch (preset) {
      case DatePresets.Today:
        setDate({
          from: date,
          to: date
        })
        break
      case DatePresets.ThisWeek:
        setDate({
          from: addDays(date, -date.getDay()),
          to: date
        })
        break
      case DatePresets.ThisMonth:
        setDate({
          from: new Date(date.getFullYear(), date.getMonth(), 1),
          to: new Date(date.getFullYear(), date.getMonth() + 1, 0)
        })
        break
      case DatePresets.ThisYear:
        setDate({
          from: new Date(date.getFullYear(), 0, 1),
          to: new Date(date.getFullYear(), 11, 31)
        })
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
    queryFn: getSalesData
  })

  return (
    <Card>
      <CardContent className="pt-[15px]">
        <Tabs className="w-full relative" defaultValue="salesVolume">
          <TabsList>
            <TabsTrigger value="salesVolume">销售额</TabsTrigger>
            <TabsTrigger value="visits">访问量</TabsTrigger>
          </TabsList>

          <div className="flex absolute right-0 top-0">
            {datePresets.map(preset => (
              <Button
                key={preset.value}
                variant="link"
                className="hover:text-[#1890ff] hover:no-underline"
                onClick={() => changeDateByPreset(preset.value)}>
                {preset.label}
              </Button>
            ))}
            <DatePickerWithRange value={date} onChange={setDate} />
          </div>

          <TabsContent value="salesVolume">
            <RankPanel
              title="门店销售额排名"
              loading={isLoading}
              data={{ chart: data, rank: data }}
            />
          </TabsContent>
          <TabsContent value="visits">
            <RankPanel
              title="门店访问量排名"
              loading={isLoading}
              data={{ chart: data, rank: data }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
