'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button, Card, Checkbox, Form, Input, message } from 'antd'
import { LoginModel } from './model'
import { useMutation } from '@tanstack/react-query'
import { request } from '@/utils/promise'
import { useMemoizedFn, useUpdateEffect } from 'ahooks'

export default function Login() {
  const [form] = Form.useForm<LoginModel>()

  const router = useRouter()

  const { isPending, mutateAsync, data, isSuccess } = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginModel) =>
      request<string>('/api/login', { method: 'post', body: JSON.stringify(body) })
  })

  const afterSubmit = useMemoizedFn(() => {
    if (data?.data) {
      // TODO 获取 token
      router.push('/dashboard/analysis')
    } else {
      message.error(data?.message || '登录失败')
    }
  })

  useUpdateEffect(() => {
    isSuccess && afterSubmit()
  }, [isSuccess, afterSubmit])

  return (
    <div className="h-full flex flex-col flex-1 items-center justify-center">
      <Card className="w-[450px]" title="用户登录">
        <Form form={form} onFinish={mutateAsync} labelCol={{ span: 4 }}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 2, message: '至少要有2个字符' },
              { max: 50, message: '最多50个字符' }
            ]}>
            <Input placeholder="用户名: admin or user" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '至少要有6个字符' },
              { max: 50, message: '最多50个字符' }
            ]}>
            <Input.Password placeholder="密码: next.antd" />
          </Form.Item>

          <div className="w-full flex justify-between text-sm mb-[15px]">
            <Checkbox>记住密码</Checkbox>

            <Link href="javascript:void(0)" className="hover:underline">
              忘记密码？
            </Link>
          </div>
          <Button htmlType="submit" type="primary" loading={isPending} block>
            提交
          </Button>
        </Form>
      </Card>
    </div>
  )
}
