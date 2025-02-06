'use client'

import AppFooter from '@/components/AppFooter'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { match } from 'ts-pattern'

const reservedAccount = {
  username: ['admin', 'user'],
  password: 'shadcn.ui'
}

const formSchema = z.object({
  username: z
    .string()
    .min(2, '至少要有2个字符')
    .max(50, '最多50个字符')
    .refine(val => reservedAccount.username.includes(val), '用户名不存在'),
  password: z
    .string()
    .min(2, '至少要有2个字符')
    .max(50, '最多50个字符')
    .refine(val => reservedAccount.password === val, '密码错误')
})

export default function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const [showPw, setShowPw] = useState(false)

  const router = useRouter()

  function onSubmit(_values: z.infer<typeof formSchema>) {
    // TODO 获取 token
    router.push('/dashboard/analysis')
  }

  return (
    <div className="h-full flex flex-col flex-1 items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>用户登录</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="用户名: admin or user" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          {...field}
                          type={showPw ? 'text' : 'password'}
                          placeholder="密码: shadcn.ui"
                        />
                        <span
                          className="cursor-pointer ml-[10px]"
                          role="button"
                          onClick={() => setShowPw(pre => !pre)}>
                          {match(showPw)
                            .with(true, () => <EyeIcon size={20} />)
                            .otherwise(() => (
                              <EyeOffIcon size={20} />
                            ))}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-password" />
                  <label
                    htmlFor="remember-password"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    记住密码
                  </label>
                </div>

                <Link href="javascript:void(0)" className="hover:underline">
                  忘记密码？
                </Link>
              </div>
              <Button type="submit">提交</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
