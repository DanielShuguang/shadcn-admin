'use client'

import { Skeleton, Table } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { ColumnsType } from 'antd/es/table'
import { KeywordRankModel } from '@/app/types/dashboard'
import { request } from '@/utils/promise'

function useSearchKeywordsRank() {
  const { data, isLoading } = useQuery({
    queryKey: ['search-keywords-rank'],
    queryFn: () => request<KeywordRankModel[]>('/api/dashboard/hotSearch/searchKeywords')
  })

  const columns: ColumnsType<KeywordRankModel> = [
    { title: '排名', dataIndex: 'rank' },
    { title: '搜索关键词', dataIndex: 'keyword' },
    { title: '用户数', dataIndex: 'user', sorter: (a, b) => a.user - b.user },
    {
      title: '周涨幅',
      dataIndex: 'week',
      render: (val: number) => `${val}%`,
      sorter: (a, b) => a.week - b.week
    }
  ]

  return { columns, isLoading, keywordsRankData: data?.data || [] }
}

export default function SearchKeywordsRank() {
  const { columns, keywordsRankData, isLoading } = useSearchKeywordsRank()

  return (
    <Skeleton loading={isLoading} paragraph={{ rows: 4 }}>
      <Table
        columns={columns}
        size="small"
        rowKey="keyword"
        pagination={{ pageSize: 5 }}
        dataSource={keywordsRankData}
      />
    </Skeleton>
  )
}
