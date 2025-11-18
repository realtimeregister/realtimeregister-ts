import Base from '@/resources/Base.ts'
import Credit from '@/models/Credit.ts'
import PriceList, { type IPriceList } from '@/models/PriceList.ts'

export default class CustomerApi extends Base {

  async credit (): Promise<Credit> {
    return this.axios.get('/customers/' + this.customer + '/credit')
      .then(response => new Credit(response.data))
  }

  async priceList (currency?: 'USD'|'EUR'): Promise<PriceList> {
    return this.axios.get<IPriceList>('/customers/' + this.customer + '/pricelist', { params: currency ? { currency } : undefined })
      .then(response => new PriceList(response.data))
  }
}
