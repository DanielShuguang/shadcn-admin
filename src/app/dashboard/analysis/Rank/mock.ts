import { sleep } from '@/utils/promise'

export async function getSalesData() {
  await sleep(1000)

  const salesData = [
    { name: '1月', value: 229 },
    { name: '2月', value: 767 },
    { name: '3月', value: 339 },
    { name: '4月', value: 573 },
    { name: '5月', value: 745 },
    { name: '6月', value: 626 },
    { name: '7月', value: 224 },
    { name: '8月', value: 707 },
    { name: '9月', value: 281 },
    { name: '10月', value: 1033 },
    { name: '11月', value: 1039 },
    { name: '12月', value: 1008 }
  ]
  return salesData
}
