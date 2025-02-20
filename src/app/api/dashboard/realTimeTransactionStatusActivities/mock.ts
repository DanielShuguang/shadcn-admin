import { RealTimeTransactionStatusActivitiesModel } from '@/app/types/dashboard'
import { randomSleep } from '@/utils/promise'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

export async function mockRealTimeTransactionStatusActivities() {
  await randomSleep()

  const data: RealTimeTransactionStatusActivitiesModel = {
    dayTotalTransaction: faker.number.int({ min: 100000, max: 200000000 }),
    salesTargetCompletionRate: faker.number.int({ min: 50, max: 100 }),
    activityDeadline:
      dayjs()
        .add(faker.number.int({ min: 10, max: 60 }), 'hour')
        .unix() * 1000,
    secondTotalTransaction: faker.number.int({ min: 100, max: 1000 })
  }

  return data
}
