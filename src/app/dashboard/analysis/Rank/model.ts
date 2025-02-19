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
