export interface IExchangeRate {
  currency: string
  exchangerates: Map<string, number>
}

export default class ExchangeRate implements IExchangeRate {
  currency: string
  exchangerates: Map<string, number>

  constructor (exchangeRate: IExchangeRate) {
    this.currency = exchangeRate.currency
    this.exchangerates = new Map(Object.entries(exchangeRate.exchangerates))
  }
}
