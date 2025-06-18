import Base from '@/resources/Base'
import Credit from '@/models/Credit'
import Price from '@/models/Price'

export default class CustomerApi extends Base {

  async credit (): Promise<Credit> {
    return this.axios.get('/customers/' + this.customer + '/credit')
      .then(response => new Credit(response.data))
  }

  async priceList (): Promise<Price> {
    return this.axios.get('/customers/' + this.customer + '/pricelist')
      .then(response => new Price(response.data))
  }

}
