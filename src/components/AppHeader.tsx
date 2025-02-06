import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

export default function AppHeader() {
  return (
    <header className="w-full h-[56px] sticky top-0 border-border border-solid border-b leading-[56px] bg-transparent">
      <SidebarTrigger className="mr-[15px]" />

      <span>Shadcn Admin</span>
    </header>
  )
}
