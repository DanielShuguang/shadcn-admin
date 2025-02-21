import { createResp } from '@/utils/promise'
import { NextResponse } from 'next/server'
import { mockSearchCharts } from './mock'

export async function GET() {
  const data = await mockSearchCharts()
  return NextResponse.json(createResp(data), { status: 200 })
}
