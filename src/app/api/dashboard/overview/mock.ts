import { OverviewModel } from '@/app/types/dashboard'
import { randomSleep } from '@/utils/promise'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

export async function mockOverviewData() {
  await randomSleep()

  const saleTotal = faker.number.int({ min: 10000, max: 500000 })
  const visitTotal = faker.number.int({ min: 500, max: 10000 })
  const result: OverviewModel = {
    salesVolume: {
      total: saleTotal,
      day: faker.number.int({ min: 10000, max: saleTotal }),
      dayTrend: faker.number.int({ min: -50, max: 50 }),
      weekTrend: faker.number.int({ min: -50, max: 50 })
    },
    operatingActivities: {
      dayTrend: faker.number.int({ min: -50, max: 50 }),
      weekTrend: faker.number.int({ min: -50, max: 50 }),
      percent: faker.number.int({ min: 0, max: 90 })
    },
    payment: {
      conversionRate: faker.number.int({ min: 10, max: 90 }),
      total: faker.number.int({ min: 1000, max: 10000 }),
      detail: Array.from({ length: 15 }).map((_, i) => ({
        count: faker.number.int({ min: 1, max: 20 }),
        date: dayjs()
          .add(i - 15, 'day')
          .format('YYYY-MM-DD')
      }))
    },
    visit: {
      total: visitTotal,
      day: faker.number.int({ min: 1, max: visitTotal }),
      detail: Array.from({ length: 15 }).map((_, i) => ({
        count: faker.number.int({ min: 1, max: 20 }),
        date: dayjs()
          .add(i - 15, 'day')
          .format('YYYY-MM-DD')
      }))
    }
  }

  return result
}
