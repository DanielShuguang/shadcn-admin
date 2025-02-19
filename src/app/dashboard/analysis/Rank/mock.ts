import { sleep } from '@/utils/promise'
import { SalesDataModel } from './model'
import dayjs from 'dayjs'
import { faker } from '@faker-js/faker'

export async function getSalesData() {
  await sleep(1000)

  const salesData: SalesDataModel = {
    annualSalesRevenue: [],
    salesRank: []
  }

  for (let i = 0; i < 12; i++) {
    const month =
      dayjs()
        .add(i - 12, 'months')
        .month() + 1
    salesData.annualSalesRevenue.push({
      name: `${month}月`,
      value: faker.number.int({ min: 100, max: 2000 })
    })
  }

  for (let i = 0; i < 7; i++) {
    salesData.salesRank.push({
      rank: i + 1,
      store: `工专路 ${i} 号店`,
      sales: faker.number.int({ min: 100000, max: 800000 })
    })
  }

  return salesData
}
