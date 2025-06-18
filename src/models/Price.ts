export interface IProductPrice {
  deal: number
  price: number
}

export interface IPromoPrice {
  deal: number
  active: boolean
  price: number
}

export interface IPriceChange {
  currency: string
  fromDate: Date
  changeNote: string
  prices: Map<string, number>
}

export interface IPromo {
  currency: string
  fromDate: Date
  endDate: Date
  promoNote?: string
  prices: Map<string, IPromoPrice>
}

export interface IProduct {
  displayNames: string[]
  currency: string
  interval: number
  prices: Map<string, IProductPrice>
  notes: Map<string, string>
  description: string
  group: string
  priceChanges?: IPriceChange
  promos?: IPromo
}

export interface IPrice {
  products: Map<string, IProduct>
}

export default class Price implements IPrice {
  products: Map<string, IProduct>

  constructor (response: IPrice) {
    this.products = response.products
  }
}
