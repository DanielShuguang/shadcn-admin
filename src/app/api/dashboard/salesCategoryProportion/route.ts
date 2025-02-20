import { createResp } from '@/utils/promise'
import { NextRequest, NextResponse } from 'next/server'
import { mockSalesCategoryData } from './mock'
import { z } from 'zod'

const schema = z.string().refine(s => ['all', 'online', 'offline'].includes(s), '无效的传参')

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type')
  const { success, error } = await schema.safeParseAsync(type)
  if (success) {
    const data = await mockSalesCategoryData()
    return NextResponse.json(createResp(data), { status: 200 })
  }

  return NextResponse.json(createResp(null, error.message), { status: 500 })
}
