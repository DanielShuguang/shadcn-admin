import { ActivitySituationPredictionModel } from '@/app/types/dashboard'
import { randomSleep } from '@/utils/promise'
import { faker } from '@faker-js/faker'

export async function mockActivitySituationPrediction() {
  await randomSleep()

  const target = faker.number.int({ min: 1000, max: 2000 })
  const data: ActivitySituationPredictionModel = {
    target,
    current: faker.number.int({ min: 300, max: target })
  }

  return data
}
