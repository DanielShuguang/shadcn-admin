'use client'

import { usePathname } from 'next/navigation'
import './globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar'
import { match } from 'ts-pattern'
import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import { useEffect, useRef } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { prepareEcharts } from '@/utils/echarts'

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
              <SidebarProvider className="h-screen w-screen">
                <AppSidebar />
                <main className="h-full flex-1 flex flex-col">
                  <AppHeader />
                  <div className="flex-1 py-[32px] px-[40px]">{children}</div>
                  <AppFooter />
                </main>
              </SidebarProvider>
            ))}
        </QueryClientProvider>
      </body>
    </html>
  )
}
