'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button, Card, Checkbox, Form, FormRule, Input } from 'antd'
import { LoginModel } from './model'

const reservedAccount = {
  username: ['admin', 'user'],
  password: 'shadcn.ui'
}

const userValidator: FormRule = {
  validator: (_, val, callback) => {
    if (reservedAccount.username.includes(val)) {
      callback()
    }
    callback('用户名不存在')
  }
}

const passwordValidator: FormRule = {
  validator: (_, val, callback) => {
    if (reservedAccount.password === val) {
      callback()
    }
    callback('密码错误')
  }
}

export default function Login() {
  const [form] = Form.useForm<LoginModel>()

  const router = useRouter()

  function onSubmit(_values: LoginModel) {
    // TODO 获取 token
    router.push('/dashboard/analysis')
  }

  return (
    <div className="h-full flex flex-col flex-1 items-center justify-center">
      <Card className="w-[450px]" title="用户登录">
        <Form form={form} onFinish={onSubmit} labelCol={{ span: 4 }}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 2, message: '至少要有2个字符' },
              { max: 50, message: '最多50个字符' },
              userValidator
            ]}>
            <Input placeholder="用户名: admin or user" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 2, message: '至少要有2个字符' },
              { max: 50, message: '最多50个字符' },
              passwordValidator
            ]}>
            <Input.Password placeholder="密码: shadcn.ui" />
          </Form.Item>

          <div className="w-full flex justify-between text-sm mb-[15px]">
            <Checkbox>记住密码</Checkbox>

            <Link href="javascript:void(0)" className="hover:underline">
              忘记密码？
            </Link>
          </div>
          <Button htmlType="submit" type="primary" block>
            提交
          </Button>
        </Form>
      </Card>
    </div>
  )
}
