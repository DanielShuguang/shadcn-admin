import { PopularSearchesModel } from '@/app/types/dashboard'
import { ChinaCityInfo } from '@/app/types/geography'
import { randomSleep } from '@/utils/promise'
import { TimeUnit } from '@/utils/time'
import { faker } from '@faker-js/faker'

// 缓存数据结构
interface CacheData {
  data: ChinaCityInfo | null
  timestamp: number
}

// 缓存过期时间 30分钟
const CACHE_EXPIRATION = 30 * TimeUnit.Minute // 30分钟，以毫秒为单位

let citiesCache: CacheData | null = null

async function getCities() {
  const now = Date.now()
  let result: ChinaCityInfo | null = null

  // 检查缓存是否存在且未过期
  if (citiesCache && now - citiesCache.timestamp < CACHE_EXPIRATION) {
    result = citiesCache.data
    // 刷新缓存时间
    citiesCache.timestamp = now
  } else {
    // 缓存不存在或已过期，重新获取数据
    const resp = await fetch(
      'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full_city'
    )
    result = await resp.json()
    // 更新缓存
    citiesCache = {
      data: result,
      timestamp: now
    }
  }

  return result?.features.map(feature => {
    const { properties } = feature
    return properties.name
  })
}

export async function mockPopularSearchesData() {
  const cities = await getCities()
  await randomSleep()

  const data =
    cities?.map<PopularSearchesModel>(city => {
      return {
        city,
        count: faker.number.int({ min: 1, max: 100 })
      }
    }) || []

  return data
}
