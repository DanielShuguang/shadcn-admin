'use client'

import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { mockSearchKeywordsRank } from './mock'
import { useQuery } from '@tanstack/react-query'
import { KeywordRankModel } from './model'
import { ColumnsType } from 'antd/es/table'

function useSearchKeywordsRank() {
  const [keywordsRankData, setKeywordsRankData] = useState<KeywordRankModel[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['search-keywords-rank'],
    queryFn: mockSearchKeywordsRank
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

  useEffect(() => {
    if (!data) return

    setKeywordsRankData(data)
  }, [data])

  return { columns, isLoading, keywordsRankData }
}

export default function SearchKeywordsRank() {
  const { columns, keywordsRankData, isLoading } = useSearchKeywordsRank()

  return <Table columns={columns} size="small" loading={isLoading} dataSource={keywordsRankData} />
}
