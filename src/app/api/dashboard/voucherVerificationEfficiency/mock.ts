import { randomSleep } from '@/utils/promise'
import { faker } from '@faker-js/faker'

export async function mockVoucherVerificationEfficiencyData() {
  await randomSleep()

  return faker.number.int({ min: 10, max: 100 })
}
