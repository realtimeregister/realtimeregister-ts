import Base from '@/resources/Base.ts'
import Credit from '@/models/Credit.ts'
import Price from '@/models/Price.ts'

export default class CustomerApi extends Base {

  async credit (): Promise<Credit> {
    return this.axios.get('/customers/' + this.customer + '/credit')
      .then(response => new Credit(response.data))
  }

  async priceList (currency?: 'USD'|'EUR'): Promise<Price> {
    return this.axios.get('/customers/' + this.customer + '/pricelist', { params: currency ? { currency } : undefined })
      .then(response => new Price(response.data))
  }
}
