import { Billable, IBillable } from '@/models/Billable.ts'

export interface ITransaction {
  id: number
  amount: number
  customer: string
  date: Date
  currency: string
  processId: number
  processType: string
  processIdentifier: string
  processAction: string
  chargesPerAccount?: Map<string, number>
  billables?: IBillable[]
}

export type TransactionField = keyof ITransaction
export type TransactionFilterField = Exclude<
    TransactionField,
    'chargesPerAccount'
    | 'billables'
    | 'customer'
  >
  | 'billableAction'
  | 'billableProviderName'
  | 'billableProduct'
  | 'billableAmount'

export default class Transaction implements ITransaction {
  id: number
  amount: number
  customer: string
  date: Date
  currency: string
  processId: number
  processType: string
  processIdentifier: string
  processAction: string
  chargesPerAccount?: Map<string, number>
  billables?: IBillable[]

  constructor (transaction: ITransaction) {
    this.id = transaction.id
    this.amount = transaction.amount
    this.customer = transaction.customer
    this.date = transaction.date
    this.date = transaction.date ? new Date(transaction.date) : transaction.date
    this.currency = transaction.currency
    this.processId = transaction.processId
    this.processType = transaction.processType
    this.processIdentifier = transaction.processIdentifier
    this.processAction = transaction.processAction
    if (transaction.chargesPerAccount) {
      this.chargesPerAccount = new Map(Object.entries(transaction.chargesPerAccount))
    }
    if (transaction.billables) {
      this.billables = transaction.billables.map(d => new Billable(d))
    }
  }
}
