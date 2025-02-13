import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import React from 'react'

export interface SpinProps extends React.HTMLAttributes<HTMLDivElement> {
  spinning?: boolean
  children: React.ReactNode
}

function Spin({ className, spinning, children, ...restProps }: SpinProps) {
  return (
    <div className={cn('relative', className)} {...restProps}>
      {spinning && (
        <div className="absolute top-0 left-0 size-full bg-[#f5f5f5] opacity-80">
          <LoaderIcon className="absolute inset-0 m-auto animate-spin" />
        </div>
      )}
      {children}
    </div>
  )
}

export default Spin
