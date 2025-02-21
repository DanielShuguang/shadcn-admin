import { NextResponse } from 'next/server'
import { mockEachCategoryProportion } from './mock'
import { createResp } from '@/utils/promise'

export async function GET() {
  const data = await mockEachCategoryProportion()

  return NextResponse.json(createResp(data), { status: 200 })
}
