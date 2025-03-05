import { NextResponse } from 'next/server'
import { mockPopularSearchesData } from './mock'
import { createResp } from '@/utils/promise'

export async function GET() {
  const data = await mockPopularSearchesData()

  return NextResponse.json(createResp(data), { status: 200 })
}
