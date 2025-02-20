import { faker } from '@faker-js/faker'

export async function mockRemainingResource() {
  return faker.number.int({ min: 5, max: 100 })
}
