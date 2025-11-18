import { BillableAction } from '@/models/Billable.ts'

export interface IPrices {
  product: string
  action: keyof typeof BillableAction
  currency: string
  price: number
}

export interface IPriceChange extends IPrices {
  /** Timestamp in UTC timezone format. */
  fromDate: string
}

export interface IPromo extends IPriceChange {
  /** Timestamp in UTC timezone format. */
  endDate: string
  active: boolean
}

export interface IPriceList {
  prices: IPrices[]
  priceChanges?: IPriceChange[],
  promos?: IPromo[]
}

export default class PriceList implements IPriceList {
  prices: IPrices[]
  priceChanges?: IPriceChange[]
  promos?: IPromo[]

  constructor (response: IPriceList) {
    this.prices = response.prices
    this.priceChanges = response.priceChanges
    this.promos = response.promos
  }

}