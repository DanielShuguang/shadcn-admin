export type MaybePromise<T> = T | Promise<T>

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
