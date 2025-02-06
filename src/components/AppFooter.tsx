import Link from 'next/link'
import React from 'react'
import Github from '@/assets/github.svg'
import Copyright from '@/assets/copyright.svg'

export default function AppFooter() {
  return (
    <footer className="">
      <div className="pt-[48px] pb-[24px] px-[16px] text-center">
        <div className="mb-[8px] text-[rgba(0,0,0,0.65)]">
          <span className="mr-[8px]">Shadcn Admin</span>
          {/* TODO 设置 github 跳转地址 */}
          <Link href="/" className="mr-[8px] inline-block">
            <Github className="w-[14px] fill-[rgba(0,0,0,0.65)]" />
          </Link>
          <Link href="https://ui.shadcn.com" target="_blank">
            Shadcn UI
          </Link>
        </div>
        <div className="text-[14px] text-[rgba(0,0,0,0.88)]">
          <Copyright className="w-[14px] mr-[3px] inline-block fill-[rgba(0,0,0,0.88)]" />
          Powered by Next.js
        </div>
      </div>
    </footer>
  )
}
