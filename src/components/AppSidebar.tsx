'use client'

import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, Grid3x3Icon, PencilLineIcon, TrainFrontIcon } from 'lucide-react'
import { Menu, MenuProps } from 'antd'
import { useRouter, usePathname } from 'next/navigation'
import { clone, uniq } from 'ramda'
import { cn } from '@/lib/utils'
import { useMemoizedFn, useUpdateEffect } from 'ahooks'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    label: 'Dashboard',
    key: '/dashboard',
    icon: <TrainFrontIcon size="16px" />,
    children: [
      { label: '分析页', key: '/dashboard/analysis' },
      { label: '监控页', key: '/dashboard/monitor' },
      { label: '工作台', key: '/dashboard/workplace' }
    ]
  },
  {
    label: '表单页',
    key: '/form',
    icon: <PencilLineIcon size="16px" />,
    children: [
      { label: '基础表单', key: '/form/basic' },
      { label: '分步表单', key: '/form/step' },
      { label: '高级表单', key: '/form/advanced' }
    ]
  },
  {
    label: '列表页',
    key: '/list',
    icon: <Grid3x3Icon size="16px" />,
    children: [
      { label: '查询表格', key: '/list/table' },
      { label: '标准列表', key: '/list/basic' },
      { label: '卡片列表', key: '/list/card' }
    ]
  }
]

export default function AppSidebar() {
  const [selectedMenuKey, setSelectedMenuKey] = useState<string[]>([])
  const [openMenuKeys, setOpenMenuKeys] = useState<string[]>([])
  const [inlineCollapsed, setInlineCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleClick: MenuProps['onClick'] = menu => {
    if (menu.keyPath.length === 1) return

    router.push(menu.key)
  }

  const updateOpenKeys = useMemoizedFn(() => {
    setOpenMenuKeys(pre => {
      if (pre.includes(pathname)) return pre

      const newList = clone(pre)
      pathname.split('/').forEach((_, index, arr) => {
        if (index === 0) return
        const key = arr.slice(0, index + 1).join('/')
        if (!newList.includes(key)) newList.push(key)
      })
      return uniq(newList)
    })
  })

  useEffect(() => {
    setSelectedMenuKey([pathname])
    updateOpenKeys()
  }, [pathname])

  useUpdateEffect(() => {
    if (!inlineCollapsed) {
      updateOpenKeys()
    }
  }, [inlineCollapsed])

  return (
    <aside
      className={cn(
        '!h-full relative border-[rgba(5,5,5,0.06)] border-r border-solid box-border',
        inlineCollapsed ? 'w-[65px]' : 'w-[257px]'
      )}>
      <div
        className="flex items-center justify-center size-[24px] rounded-[24px] z-[101] cursor-pointer absolute bg-[#fff] shadow-md right-[-12px] top-[50px]"
        onClick={() => setInlineCollapsed(!inlineCollapsed)}>
        <ChevronLeftIcon
          className={cn('text-[rgba(0,0,0,0.25)] hover:text-[rgba(0,0,0,0.65)] transition-all', {
            'rotate-180': inlineCollapsed
          })}
          size="1em"
        />
      </div>
      <Menu
        className="!w-full"
        items={items}
        mode="inline"
        selectedKeys={selectedMenuKey}
        defaultSelectedKeys={selectedMenuKey}
        openKeys={openMenuKeys}
        inlineCollapsed={inlineCollapsed}
        onOpenChange={setOpenMenuKeys}
        onClick={handleClick}
      />
    </aside>
  )
}
