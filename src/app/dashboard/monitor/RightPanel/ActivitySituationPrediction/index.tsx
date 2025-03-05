import { ActivitySituationPredictionModel } from '@/app/types/dashboard'
import { request } from '@/utils/promise'
import { useQuery } from '@tanstack/react-query'
import { Card, Skeleton, Statistic } from 'antd'

export default function ActivitySituationPrediction() {
  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ['activity-situation-prediction'],
    queryFn: () =>
      request<ActivitySituationPredictionModel>('/api/dashboard/activitySituationPrediction')
  })

  const { current = 0, target = 0 } = activityData?.data || {}

  const shouldComplete = current * 1.3 > target

  return (
    <Card className="!mb-[24px] min-h-[calc(50%-24px)]" title="活动情况预测">
      <Skeleton loading={activityLoading} paragraph={{ rows: 2 }}>
        <Statistic title="目标评估" value={shouldComplete ? '有望达到预期' : '难以达到预期'} />
        <div>
          <p className="mb-[14px]">{target} 亿元</p>
          <div className="relative top-[-5px] h-[2px] w-full bg-[#e9e9e9]"></div>
          <p>{current} 亿元</p>
        </div>
      </Skeleton>
    </Card>
  )
}
