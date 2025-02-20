'use client'

import { RealTimeTransactionStatusActivitiesModel } from '@/app/types/dashboard'
import { request } from '@/utils/promise'
import { useQuery } from '@tanstack/react-query'
import { Row, Col, Statistic, Skeleton } from 'antd'

export default function HeaderInfo() {
  const { data, isLoading } = useQuery({
    queryKey: ['real-time-status-activities'],
    queryFn: () =>
      request<RealTimeTransactionStatusActivitiesModel>(
        '/api/dashboard/realTimeTransactionStatusActivities'
      )
  })

  const {
    dayTotalTransaction,
    salesTargetCompletionRate,
    activityDeadline,
    secondTotalTransaction
  } = data?.data || {}

  return (
    <Skeleton loading={isLoading}>
      <Row>
        <Col xs={24} sm={12} md={6}>
          <Statistic title="今日交易总额" value={dayTotalTransaction} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic title="销售目标完成率" value={`${salesTargetCompletionRate}%`} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic.Countdown
            title="活动时间剩余"
            value={activityDeadline}
            format="HH:mm:ss:SSS"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic title="每秒交易总额" value={`${secondTotalTransaction}元`} />
        </Col>
      </Row>
    </Skeleton>
  )
}
