import { mockRemainingResource } from './mock'

export async function GET() {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const encoder = new TextEncoder()

  let isAborted = false
  // 定义发送消息的函数
  const sender = async () => {
    try {
      const percent = await mockRemainingResource()
      await writer.write(encoder.encode(`data: ${percent}\n\n`))
    } catch (error) {
      isAborted = true
      console.error('Error while sending data:', error)
    }
  }

  // 设置定时器并保存其 ID
  const intervalId = setInterval(() => {
    if (isAborted) {
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
      console.log('Client disconnected, cleaning up...')
      clearInterval(intervalId) // 清理定时器
    })
    .catch(err => {
      console.error('Writer closed with an error:', err)
    })

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  })
}
