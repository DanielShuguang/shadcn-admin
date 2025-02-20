import { NextResponse } from 'next/server'
import { mockOverviewData } from './mock'
import { createResp } from '@/utils/promise'

export async function GET() {
  const data = await mockOverviewData()
  return NextResponse.json(createResp(data), { status: 200 })
}
