import { createResp } from '@/utils/promise'
import { NextResponse } from 'next/server'
import { mockSearchKeywordsRank } from './mock'

export async function GET() {
  const data = await mockSearchKeywordsRank()
  return NextResponse.json(createResp(data), { status: 200 })
}
