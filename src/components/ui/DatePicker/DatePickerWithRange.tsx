'use client'

import { useCallback, useMemo, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '../button'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../calendar'
import { DateRange } from 'react-day-picker'
import { format } from '@/utils/date-fns'

export interface DatePickerWithRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: DateRange
  onChange?: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
  className,
  value,
  onChange,
  ...restProps
}: DatePickerWithRangeProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  })

  const currentValue = useMemo(() => value ?? date, [value, date])

  const currentChange = useCallback(
    (date: DateRange | undefined) => {
      setDate(date)
      onChange?.(date)
    },
    [onChange]
  )

  return (
    <div className={cn('grid gap-2', className)} {...restProps}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !currentValue && 'text-muted-foreground'
            )}>
            <CalendarIcon />
            {currentValue?.from ? (
              currentValue.to ? (
                <>
                  {format(currentValue.from, 'LLL dd, y')} - {format(currentValue.to, 'LLL dd, y')}
                </>
              ) : (
                format(currentValue.from, 'LLL dd, y')
              )
            ) : (
              <span>选择日期</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={currentValue?.from}
            selected={currentValue}
            onSelect={currentChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
