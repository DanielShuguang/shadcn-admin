import { mockRemainingResource } from './mock'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const encoder = new TextEncoder()

  // 定义发送消息的函数
  const sender = async () => {
    try {
      const percent = await mockRemainingResource()
      await writer.write(encoder.encode(`data: ${percent}\n\n`))
    } catch (error) {
      console.error('发送消息时出错:', error)
    }
  }

  // 设置定时器并保存其 ID
  const intervalId = setInterval(() => {
    if (req.signal.aborted) {
      clearInterval(intervalId) // 清理定时器
    } else {
      sender()
    }
  }, 5000)

  // 立即发送一次消息
  sender()

  // 监听流的关闭事件
  writer.closed
    .then(() => {
      console.log('客户端已关闭连接, 停止发送消息...')
    })
    .catch(err => {
      console.error('关闭流时发生错误:', err)
    })
    .finally(() => {
      clearInterval(intervalId) // 清理定时器
    })

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  })
}
