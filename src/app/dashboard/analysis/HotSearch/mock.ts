import { sleep } from '@/utils/promise'
import { KeywordRankModel } from './model'

export async function mockSearchCharts() {
  await sleep(1000)
  return [1, 6, 4, 8, 3, 7, 2]
}

export async function mockSearchKeywordsRank() {
  await sleep(1000)
  const list: KeywordRankModel[] = []

  for (let i = 0; i < 100; i++) {
    const count = i + 1
    list.push({
      keyword: `关键词${count}`,
      rank: count,
      user: Math.floor(Math.random() * 1000),
      week: +(Math.random() * 100).toFixed(2)
    })
  }

  return list
}
