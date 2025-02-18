'use client'

import './globals.css'
import '@ant-design/v5-patch-for-react-19'
import 'dayjs/locale/zh-cn'

import { usePathname } from 'next/navigation'
import AppSidebar from '@/components/AppSidebar'
import { match } from 'ts-pattern'
import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import { useEffect, useRef } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { prepareEcharts } from '@/utils/echarts'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'

dayjs.locale('zh-cn')

prepareEcharts()

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const queryClient = useRef(new QueryClient())

  useEffect(() => {}, [])

  return (
    <html lang="zh-CN">
      <body className="antialiased overflow-x-hidden">
        <ConfigProvider locale={zhCN}>
          <AntdRegistry>
            <QueryClientProvider client={queryClient.current}>
              {match(pathname)
                .with('/login', () => (
                  <main className="h-screen w-screen flex flex-col">
                    <div className="flex-1 w-full flex flex-col">
                      <div className="flex-1">{children}</div>
                      <AppFooter />
                    </div>
                  </main>
                ))
                .otherwise(() => (
                  <div className="h-screen w-screen flex">
                    <AppSidebar />
                    <main className="h-full flex-1 flex flex-col">
                      <AppHeader />
                      <div className="flex-1 py-[32px] px-[40px]">{children}</div>
                      <AppFooter />
                    </main>
                  </div>
                ))}
            </QueryClientProvider>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  )
}
