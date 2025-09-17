import { afterEach, describe, expect, it, vi } from 'vitest'
import BillingApi from '@/resources/BillingApi.ts'
import AxiosMockAdapter from 'axios-mock-adapter'
import staticAxios, { CancelToken } from 'axios'
import Transaction, { ITransaction, TransactionField } from '@/models/Transaction.ts'
import Page, { IPage } from '@/models/Page.ts'
import { TransactionListParams } from '@/models/ListParams.ts'
import ExchangeRate, { IExchangeRate } from '@/models/ExchangeRate.ts'

describe('BillingApi', () => {
  const mockAxios = staticAxios.create({ baseURL: 'https://api.yoursrs-ote.com/v2/' })
  let billingApi: BillingApi
  let mockAdapter: AxiosMockAdapter

  beforeEach(() => {
    billingApi = new BillingApi(mockAxios, 'test-customer')
    mockAdapter = new AxiosMockAdapter(mockAxios)
  })

  afterEach(() => {
    mockAdapter.restore()
  })

  describe('constructor', () => {

    it('Should create instance with correct properties', () => {
      expect(billingApi).toBeInstanceOf(BillingApi)
      expect(billingApi.axios).toBe(mockAxios)
      expect(billingApi.customer).toBe('test-customer')
    })

    it('Should create instance without customer', () => {
      const api = new BillingApi(mockAxios)
      expect(api.customer).toBeUndefined()
    })

  })

  describe('getTransaction', () => {
    const mockedTransactionData: ITransaction = {
      id: 1,
      amount: 10.00,
      customer: 'test-customer',
      date: new Date('2025-17-09'),
      currency: 'USD',
      processId: 999,
      processType: 'domain',
      processAction: 'create',
      processIdentifier: 'example.com',
    }

    it('Should get transaction by ID string', async () => {
      mockAdapter.onGet('/billing/financialtransactions/1').reply(200, mockedTransactionData)

      const result = await billingApi.getTransaction('1')
      expect(result).toBeInstanceOf(Transaction)
      expect(result.id).toBe(1)
      expect(result.amount).toBe(10.00)
      expect(result.customer).toBe('test-customer')
    })

    it('Should get transaction by transaction object', async () => {
      mockAdapter.onGet('/billing/financialtransactions/1').reply(200, mockedTransactionData)

      const result = await billingApi.getTransaction({ id: 1, amount: 0, customer: 'test-customer', date: new Date(), currency: 'USD', processId: 0, processType: '', processAction: '', processIdentifier: '' })
      expect(result).toBeInstanceOf(Transaction)
      expect(result.id).toBe(1)
      expect(result.amount).toBe(10.00)
      expect(result.customer).toBe('test-customer')
    })

    it('Should get transaction with specific fields', async () => {
      const requestedFields: TransactionField[] = ['id', 'amount', 'customer']

      mockAdapter.onGet('/billing/financialtransactions/1').reply(config => {
        expect(config.params.fields).toEqual(requestedFields)
        return [200, mockedTransactionData]
      })

      const result = await billingApi.getTransaction('1', requestedFields)
      expect(result).toBeInstanceOf(Transaction)
      expect(mockAdapter.history.get[0].params.fields).toEqual(requestedFields)
    })

  })

  describe('listTransactions', () => {
    const mockedTransactionsList: IPage<ITransaction> = {
      entities: [
        {
          id: 123,
          amount: 10.50,
          customer: 'test-customer',
          date: new Date('2023-01-01'),
          currency: 'USD',
          processId: 456,
          processType: 'domain',
          processIdentifier: 'example.com',
          processAction: 'create'
        },
        {
          id: 124,
          amount: 20.00,
          customer: 'test-customer',
          date: new Date('2023-01-02'),
          currency: 'EUR',
          processId: 457,
          processType: 'ssl',
          processIdentifier: 'ssl-cert-123',
          processAction: 'renew'
        }
      ],
      pagination: {
        limit: 10,
        offset: 0,
        total: 2
      }
    }

    it('Should list transactions without parameters', async () => {
      mockAdapter.onGet('/billing/financialtransactions/').reply(200, mockedTransactionsList)

      const result = await billingApi.listTransactions()
      expect(result).toBeInstanceOf(Page)
      expect(result.entities).toHaveLength(2)
      expect(result.pagination).toBeDefined()
      expect(result.entities[0]).toBeInstanceOf(Transaction)
      expect(result.entities[1]).toBeInstanceOf(Transaction)
    })

    it('Should list transactions with parameters', async () => {
      const params: TransactionListParams = {
        limit: 5,
        offset: 10,
        order: ['-date'],
        filters: [
          { field: 'currency', matcher: 'eq', value: 'USD' }
        ]
      }

      vi.spyOn(billingApi, 'listParamsToUrlParams').mockReturnValue({
        limit: 5,
        offset: 10,
        order: ['-date'],
        currency: 'USD'
      })

      mockAdapter.onGet('/billing/financialtransactions/').reply(config => {
        expect(config.params.currency).toBe('USD')
        return [200, mockedTransactionsList]
      })

      const result = await billingApi.listTransactions(params)
      expect(result).toBeInstanceOf(Page)
      expect(billingApi.listParamsToUrlParams).toHaveBeenCalled()
    })

    it('Should handle empty transactions list', async () => {
      const emptyList = {
        entities: [],
        pagination: {
          limit: 10,
          offset: 0,
          total: 0
        }
      }

      mockAdapter.onGet('/billing/financialtransactions/').reply(200, emptyList)

      const result = await billingApi.listTransactions()

      expect(result.entities).toHaveLength(0)
      expect(result.pagination.total).toBe(0)
    })

    it('Should handle cancel token', async () => {
      const cancelToken: CancelToken = staticAxios.CancelToken.source().token
      mockAdapter.onGet('/billing/financialtransactions/').reply(200, mockedTransactionsList)

      // @ts-ignore
      const result = await billingApi.listTransactions(undefined, { cancelToken })

      expect(result).toBeInstanceOf(Page)
      expect(mockAdapter.history.get[0]).toHaveProperty('cancelToken', cancelToken)
    })


  })

  describe('getExchangeRates', () => {
    const mockedExchangeRates: IExchangeRate[] = [
      {
        currency: 'USD',
        // @ts-ignore
        exchangerates: { 'EUR': 0.85, 'GBP': 0.77 }
      },
      {
        currency: 'EUR',
        // @ts-ignore
        exchangerates: { 'USD': 1.18, 'GBP': 0.88 }
      }
    ]

    it('Should get exchange rates', async () => {
      mockAdapter.onGet('/exchangerates/').reply(200, mockedExchangeRates)

      const result = await billingApi.getExchangeRates()
      expect(result).toHaveLength(2)
      expect(result[0]).toBeInstanceOf(ExchangeRate)
      expect(result[0].currency).toBe('USD')
      expect(result[0].exchangerates.get('EUR')).toBe(0.85)
      expect(result[1].currency).toBe('EUR')
      expect(result[1].exchangerates.get('USD')).toBe(1.18)
    })

    it('Should handle empty exchange rates list', async () => {
      mockAdapter.onGet('/exchangerates/').reply(200, [])

      const result = await billingApi.getExchangeRates()
      expect(result).toHaveLength(0)
    })

    it('Should handle undefined response data', async () => {
      mockAdapter.onGet('/exchangerates/').reply(200, undefined)

      const result = await billingApi.getExchangeRates()

      expect(result).toHaveLength(0)
    })


  })

})
