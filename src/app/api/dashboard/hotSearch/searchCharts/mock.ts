import { randomSleep } from '@/utils/promise'
import dayjs from 'dayjs'
import { faker } from '@faker-js/faker'
import { SearchDataModel, KeywordRankModel } from '@/app/types/dashboard'

export async function mockSearchCharts() {
  await randomSleep()

  const list: SearchDataModel[] = []

  for (let i = 0; i < 7; i++) {
    list.push({
      count: faker.number.int({ min: 0, max: 10 }),
      date: dayjs()
        .add(i - 7, 'day')
        .format('YYYY-MM-DD')
    })
  }

  return list
}

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
