'use client'

import EchartsReact from '@/components/EchartsReact'
import { ECOption } from '@/utils/echarts'
import { useUpdateEffect } from 'ahooks'
import { Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'

function getChartColor(percent: number) {
  return percent <= 20
    ? '#f5222d'
    : percent <= 40
    ? '#fa8c16'
    : percent <= 60
    ? '#faad14'
    : percent <= 80
    ? '#13c2c2'
    : '#52c41a'
}

export default function RemainingResources() {
  const eventSource = useRef<EventSource>(null)
  const [percent, setPercent] = useState(0)

  function initSSE() {
    eventSource.current = new EventSource('/api/dashboard/remainingResources')

    eventSource.current.onmessage = event => {
      const data = JSON.parse(event.data)
      setPercent(data || 0)
      // 处理数据逻辑
    }

    eventSource.current.onerror = error => {
      message.error(`SSE连接异常: ${error}`)
      eventSource.current?.close()
      initSSE()
    }
  }

  useEffect(() => {
    initSSE()

    return () => eventSource.current?.close()
  }, [])

  const [options, setOptions] = useState<ECOption>({})

  useUpdateEffect(() => {
    setOptions({
      series: [
        {
          type: 'liquidFill',
          radius: '75%',
          center: ['50%', '45%'],
          data: [
            {
              value: [percent / 100],
              label: {
                normal: {
                  formatter: `${percent}%`,
                  show: true
                }
              }
            }
          ],
          label: {
            normal: {
              textStyle: {
                // 数值样式设置
                color: '#888884',
                fontSize: 22
              }
            }
          },
          color: [getChartColor(percent)],
          backgroundStyle: { color: '#fff' },
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 2, // 边 宽度
              borderColor: 'rgba(49,102,255,0.5)'
            }
          }
        }
      ]
    } as any)
  }, [percent])

  return (
    <Card title="资源剩余">
      <EchartsReact className="h-[160px]" options={options} />
    </Card>
  )
}
