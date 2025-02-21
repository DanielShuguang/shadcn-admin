import { randomSleep } from '@/utils/promise'
import { faker } from '@faker-js/faker'
import { KeywordRankModel } from '@/app/types/dashboard'

export async function mockSearchKeywordsRank() {
  await randomSleep()
  const list: KeywordRankModel[] = []

  for (let i = 0; i < 50; i++) {
    const count = i + 1
    list.push({
      keyword: `关键词${count}`,
      rank: count,
      user: faker.number.int({ min: 1, max: 1000 }),
      week: +faker.number.float({ min: 1, max: 100 }).toFixed(2)
    })
  }

  return list
}
