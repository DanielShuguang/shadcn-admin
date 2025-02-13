'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'
import { omit } from 'radash'

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  innerProps?: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator>
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, innerProps, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
      {...props}>
      <ProgressPrimitive.Indicator
        {...omit(innerProps || {}, ['className', 'style'])}
        className={cn('h-full w-full flex-1 bg-primary transition-all', innerProps?.className)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)`, ...innerProps?.style }}
      />
    </ProgressPrimitive.Root>
  )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
