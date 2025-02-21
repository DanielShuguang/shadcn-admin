import { randomSleep } from '@/utils/promise'
import { faker } from '@faker-js/faker'

export async function mockEachCategoryProportion() {
  await randomSleep()

  const data: number[] = []

  for (let i = 0; i < 3; i++) {
    data.push(faker.number.int({ min: 10, max: 90 }))
  }

  return data
}
