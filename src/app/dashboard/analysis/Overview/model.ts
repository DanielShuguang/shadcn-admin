export interface OverviewModel {
  salesVolume: SalesVolume
  visit: Visit
  payment: Payment
  operatingActivities: OperatingActivities
}

export interface SalesVolume {
  total: number
  dayTrend: number
  weekTrend: number
  day: number
}

export interface Visit {
  total: number
  day: number
  detail: VisitDetail[]
}

export interface VisitDetail {
  date: string
  count: number
}

export interface Payment {
  total: number
  conversionRate: number
  detail: PaymentDetail[]
}

export type PaymentDetail = VisitDetail

export interface OperatingActivities {
  percent: number
  dayTrend: number
  weekTrend: number
}
