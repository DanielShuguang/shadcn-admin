import React from 'react'
import SearchCharts from './SearchCharts'
import { Card } from 'antd'
import SearchKeywordsRank from './SearchKeywordsRank'

export default function HotSearch() {
  return (
    <Card title="线上热门搜索">
      <SearchCharts />
      <SearchKeywordsRank />
    </Card>
  )
}
