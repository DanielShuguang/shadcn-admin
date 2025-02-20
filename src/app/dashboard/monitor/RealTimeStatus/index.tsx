import { Card, Skeleton } from 'antd'
import HeaderInfo from './HeaderInfo'

export default function RealTimeStatus() {
  return (
    <Card title="活动实时交易情况" className="min-h-full">
      <Skeleton loading={false} paragraph={{ rows: 5 }}>
        <HeaderInfo />
        <div className="h-[452px]"></div>
      </Skeleton>
    </Card>
  )
}
