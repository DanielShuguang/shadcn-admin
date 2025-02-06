import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipArrow } from '@radix-ui/react-tooltip'

export interface TooltipComponentProps {
  children: React.ReactNode
  content: React.ReactNode
}

export default function TooltipComponent({ children, content }: TooltipComponentProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          {content}
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
