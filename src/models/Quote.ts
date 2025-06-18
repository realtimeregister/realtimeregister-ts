import { Billable, IBillable } from '@/models/Billable'

export interface IQuote {
  currency?: string
  total: number
  billables?: IBillable[]
}

export default class Quote {
  currency?: string
  total: number
  billables?: Billable[]

  constructor (quote: IQuote) {
    this.total = quote.total
    if (quote.currency) {
      this.currency = quote.currency
    }
    if (quote.billables) {
      this.billables = quote.billables.map(b => new Billable(b))
    }
  }
}
