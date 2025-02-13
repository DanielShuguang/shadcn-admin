import { format as dateFormat } from 'date-fns'
import { zhCN } from 'date-fns/locale'

/**
 * 格式化日期 - 中文
 * @param args
 * @returns
 */
export function format(...args: Parameters<typeof dateFormat>) {
  const [date, formatStr, options] = args
  return dateFormat(date, formatStr, { locale: zhCN, ...options })
}
