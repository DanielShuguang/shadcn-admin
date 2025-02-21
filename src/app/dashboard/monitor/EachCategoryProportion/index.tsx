'use client'

import { request } from '@/utils/promise'
import { useQuery } from '@tanstack/react-query'
import { Card, Col, Progress, Row, Skeleton } from 'antd'

export default function EachCategoryProportion() {
  const { data, isLoading } = useQuery({
    queryKey: ['each-category-proportion'],
    queryFn: () => request<number[]>('/api/dashboard/eachCategoryProportion')
  })

  return (
    <Card title="各品类占比" className="min-h-full">
      <Skeleton loading={isLoading} paragraph={{ rows: 2 }}>
        <Row className="py-[16px]">
          <Col span={8}>
            <Progress type="dashboard" percent={data?.data?.[0] || 0} />
          </Col>
          <Col span={8}>
            <Progress type="dashboard" percent={data?.data?.[1] || 0} />
          </Col>
          <Col span={8}>
            <Progress type="dashboard" percent={data?.data?.[2] || 0} />
          </Col>
        </Row>
      </Skeleton>
    </Card>
  )
}
