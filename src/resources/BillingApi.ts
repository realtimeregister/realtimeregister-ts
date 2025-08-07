import Base from '@/resources/Base.ts'
import Transaction, { ITransaction, TransactionField } from '@/models/Transaction.ts'
import Page from '@/models/Page.ts'
import { TransactionListParams } from '@/models/ListParams.ts'
import { CancelToken } from 'axios'
import ExchangeRate, { IExchangeRate } from '@/models/ExchangeRate.ts'

export default class BillingApi extends Base {

  /**
   * Get a transaction.
   * @param transaction - transaction object, or id.
   * @param fields - fields to include in response.
   */
  async getTransaction (transaction: ITransaction | string, fields?: TransactionField[]): Promise<Transaction> {
    return this.axios.get('/billing/financialtransactions/' + ((transaction as ITransaction).id || transaction), { params: { fields } })
      .then(response => new Transaction(response.data))
  }

  /**
   * Request a list of transactions
   * @param params - object containing parameters passed to the listing, see TransactionListParams.
   * @param cancelToken
   */
  async listTransactions (params?: TransactionListParams, cancelToken?: CancelToken): Promise<Page<Transaction>> {
    return this.axios.get('/billing/financialtransactions/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Transaction[] = (response.data.entities || []).map((data: ITransaction) => new Transaction(data))
        return new Page<Transaction>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Get exchange rates.
   */
  async getExchangeRates (): Promise<ExchangeRate[]> {
    return this.axios.get('/exchangerates/')
      .then((response) => {
        return (response.data || []).map((data: IExchangeRate) => new ExchangeRate(data))
      })
  }

}
