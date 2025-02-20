import { createResp } from '@/utils/promise'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const reservedAccount = {
  username: ['admin', 'user'],
  password: 'next.antd'
}

const schema = z.object({
  username: z
    .string()
    .min(2)
    .max(50)
    .refine(val => reservedAccount.username.includes(val), '用户名不存在'),
  password: z
    .string()
    .min(6)
    .max(50)
    .refine(val => reservedAccount.password === val, '密码错误')
})

export async function POST(req: NextRequest) {
  const { data, success, error } = await schema.safeParseAsync(await req.json())
  if (!success) {
    return NextResponse.json(createResp(null, error.message), { status: 400 })
  }

  return NextResponse.json(createResp('登录成功'), { status: 200 })
}
