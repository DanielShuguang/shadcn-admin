import { createResp } from '@/utils/promise'
import { mockSalesData } from './mock'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await mockSalesData()
  return NextResponse.json(createResp(data), { status: 200 })
}
