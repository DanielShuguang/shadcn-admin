import { Card, Col } from 'antd'
import React from 'react'

export default function RightPanel() {
  return (
    <>
      <Card className="!mb-[24px] min-h-[calc(50%-24px)]" title="活动情况预测"></Card>
      <Card className="!mb-[24px] min-h-[calc(50%-24px)]" title="券核效率"></Card>
    </>
  )
}
