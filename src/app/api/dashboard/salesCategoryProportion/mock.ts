import { SalesCategoryProportionModel } from '@/app/types/dashboard'
import { randomSleep } from '@/utils/promise'
import { faker } from '@faker-js/faker'

export async function mockSalesCategoryData() {
  await randomSleep()

  const data: SalesCategoryProportionModel[] = [
    { name: '家用电器', value: 0 },
    { name: '食用酒水', value: 0 },
    { name: '个护健康', value: 0 },
    { name: '服饰箱包', value: 0 },
    { name: '母婴产品', value: 0 },
    { name: '其他', value: 0 }
  ]

  data.forEach(el => {
    el.value = faker.number.int({ min: 1000, max: 5000 })
  })

  return data
}
