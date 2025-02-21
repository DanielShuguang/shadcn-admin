'use client'

import EchartsReact from '@/components/EchartsReact'
import { ECOption } from '@/utils/echarts'
import { useUpdateEffect } from 'ahooks'
import { Card, message } from 'antd'
import { graphic } from 'echarts/core'
import { useEffect, useRef, useState } from 'react'

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
          color: [
            new graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 1, color: 'rgb(11,175,202)' },
              { offset: 0, color: 'rgb(0,145,255)' }
            ])
          ],
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
