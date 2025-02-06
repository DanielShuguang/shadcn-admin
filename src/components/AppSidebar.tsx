import React from 'react'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from './ui/sidebar'
import { ChevronDownIcon, Grid3x3Icon, PencilLineIcon, TrainFrontIcon } from 'lucide-react'
import { match } from 'ts-pattern'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import Link from 'next/link'

interface SidebarItem {
  title: string
  url?: string
  icon?: React.ComponentType<any>
  children?: SidebarItem[]
}

const items: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: TrainFrontIcon,
    children: [
      { title: '分析页', url: '/dashboard/analysis' },
      { title: '监控页', url: '/dashboard/monitor' },
      { title: '工作台', url: '/dashboard/workplace' }
    ]
  },
  {
    title: '表单页',
    icon: PencilLineIcon,
    children: [
      { title: '基础表单', url: '/form/basic' },
      { title: '分步表单', url: '/form/step' },
      { title: '高级表单', url: '/form/advanced' }
    ]
  },
  {
    title: '列表页',
    icon: Grid3x3Icon,
    children: [
      { title: '查询表格', url: '/list/table' },
      { title: '标准列表', url: '/list/basic' },
      { title: '卡片列表', url: '/list/card' }
    ]
  }
]

function getButtonContent(item: SidebarItem, isParent?: boolean) {
  return match(item.url)
    .when(
      val => val,
      url => (
        <Link href={url!}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      )
    )
    .otherwise(() => (
      <span>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
        {isParent && (
          <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        )}
      </span>
    ))
}

function renderSidebarGroup(menus: SidebarItem[], isChild?: boolean) {
  return (
    <>
      {menus.map(item => {
        if (item.children?.length) {
          return (
            <SidebarMenu key={item.title}>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger className="w-[90%]">
                    <SidebarMenuButton asChild>{getButtonContent(item, true)}</SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent>
                  <SidebarMenuSub>{renderSidebarGroup(item.children, true)}</SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          )
        }
        if (isChild) {
          return (
            <SidebarMenuSubItem key={item.title}>
              <SidebarMenuButton asChild>{getButtonContent(item)}</SidebarMenuButton>
            </SidebarMenuSubItem>
          )
        }
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>{getButtonContent(item)}</SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </>
  )
}

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      <SidebarMenu>{renderSidebarGroup(items)}</SidebarMenu>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}
