import { NextResponse } from 'next/server'
import { mockVoucherVerificationEfficiencyData } from './mock'
import { createResp } from '@/utils/promise'

export async function GET() {
  const data = await mockVoucherVerificationEfficiencyData()

  return NextResponse.json(createResp(data), { status: 200 })
}
