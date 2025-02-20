import { createResp } from '@/utils/promise'
import { NextResponse } from 'next/server'
import { mockRealTimeTransactionStatusActivities } from './mock'

export async function GET() {
  const data = await mockRealTimeTransactionStatusActivities()
  return NextResponse.json(createResp(data), { status: 200 })
}
