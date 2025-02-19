'use client'

import { Card, Radio } from 'antd'
import { useState } from 'react'

export default function SalesCategoryProportion() {
  const [activeType, setActiveType] = useState('all')

  return (
    <Card
      title={
        <div className="flex justify-between">
          <span>销售额类别占比</span>

          <div>
            <Radio.Group value={activeType} onChange={e => setActiveType(e.target.value)}>
              <Radio.Button value="all">全部渠道</Radio.Button>
              <Radio.Button value="online">线上</Radio.Button>
              <Radio.Button value="offline">门店</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }>
      <div className="w-full h-[389px]"></div>
    </Card>
  )
}
