import { faker } from '@faker-js/faker'

export type MaybePromise<T> = T | Promise<T>

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomSleep() {
  return sleep(faker.number.int({ min: 100, max: 1000 }))
}

export interface CommonResp<T> {
  data: T | null
  message?: string
}

export function createResp<T>(data: T | null, message?: string): CommonResp<T> {
  return {
    data,
    message
  }
}

export async function request<T>(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args)
  const resp: CommonResp<T | null> = await res.json()
  return resp
}
