'use client'

import { Card, message } from 'antd'
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

    return eventSource
  }

  useEffect(() => {
    initSSE()

    return () => eventSource.current?.close()
  }, [])

  return (
    <Card title="资源剩余">
      <div className="h-[160px]"></div>
    </Card>
  )
}
