import { Card, Tooltip } from 'antd'
import { InfoIcon } from 'lucide-react'

export interface CustomCardProps {
  title: React.ReactNode
  statText: React.ReactNode
  main: React.ReactNode
  footer: React.ReactNode
}

export function CustomCard({ title, statText, footer, main }: CustomCardProps) {
  return (
    <div className="px-[12px] mb-[24px] xl:max-w-[25%] xl:flex-[25%] sm:max-w-[50%] sm:flex-[50%] max-w-full">
      <Card
        title={
          <span className="text-[14px] flex w-full justify-between text-[rgba(0,0,0,0.65)]">
            <span>{title}</span>
            <Tooltip title="指标说明">
              <InfoIcon className="cursor-pointer" size="1em" />
            </Tooltip>
          </span>
        }>
        <div className="text-[rgba(0,0,0,0.88)]">
          <div className="text-[30px] leading-[38px] text-nowrap">{statText}</div>
          <div className="h-[46px] mb-[12px]">{main}</div>
          <div className="text-[14px] pt-[9px] border-t border-solid border-[rgba(5,5,5,0.06)]">
            {footer}
          </div>
        </div>
      </Card>
    </div>
  )
}
