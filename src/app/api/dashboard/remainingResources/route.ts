import { mockRemainingResource } from './mock'

export async function GET() {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const encoder = new TextEncoder()

  setInterval(async () => {
    const time = await mockRemainingResource()
    await writer.write(encoder.encode(`data: ${time}\n\n`))
  }, 5000)

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  })
}
