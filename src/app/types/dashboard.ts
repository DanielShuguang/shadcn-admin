export interface KeywordRankModel {
  keyword: string
  rank: number
  user: number
  week: number
}

export interface SearchDataModel {
  count: number
  date: string
}

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

export interface SalesDataModel {
  salesRank: SalesRank[]
  annualSalesRevenue: AnnualSalesRevenue[]
}

export interface AnnualSalesRevenue {
  name: string
  value: number
}

export interface SalesRank {
  rank: number
  sales: number
  store: string
}

export interface SalesCategoryProportionModel {
  name: string
  value: number
}
