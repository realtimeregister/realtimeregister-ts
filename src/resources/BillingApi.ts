import Base from '@/resources/Base'
import Transaction, { ITransaction } from '@/models/Transaction'
import Page from '@/models/Page'
import ListParams from '@/models/ListParams'
import { CancelToken } from 'axios'
import ExchangeRate, { IExchangeRate } from '@/models/ExchangeRate'

export default class BillingApi extends Base {

  async getTransaction (transaction: ITransaction | string, fields?: string[]): Promise<Transaction> {
    return this.axios.get('/billing/financialtransactions/' + ((transaction as ITransaction).id || transaction), { params: { fields } })
      .then(response => new Transaction(response.data))
  }

  async listTransactions (params?: ListParams, cancelToken?: CancelToken): Promise<Page<Transaction>> {
    return this.axios.get('/billing/financialtransactions/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Transaction[] = (response.data.entities || []).map((data: ITransaction) => new Transaction(data))
        return new Page<Transaction>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async getExchangeRates (): Promise<ExchangeRate[]> {
    return this.axios.get('/exchangerates/')
      .then((response) => {
        return (response.data || []).map((data: IExchangeRate) => new ExchangeRate(data))
      })
  }

}
