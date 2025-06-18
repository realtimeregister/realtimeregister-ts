export enum BillableAction {
  CREATE = 'CREATE',
  TRANSFER = 'TRANSFER',
  RENEW = 'RENEW',
  RESTORE = 'RESTORE',
  REQUEST = 'REQUEST',
  TRANSFER_RESTORE = 'TRANSFER_RESTORE',
  UPDATE = 'UPDATE',
  UPDATE_ADMINISTRATION = 'UPDATE_ADMINISTRATION',
  REGISTRANT_CHANGE = 'REGISTRANT_CHANGE',
  LOCAL_CONTACT = 'LOCAL_CONTACT',
  NEGATIVE_MARKUP = 'NEGATIVE_MARKUP',
  PRIVACY_PROTECT = 'PRIVACY_PROTECT',
  EXTRA_WILDCARD = 'EXTRA_WILDCARD',
  EXTRA_DOMAIN = 'EXTRA_DOMAIN',
  REGISTRY_LOCK = 'REGISTRY_LOCK'
}

export interface IBillable {
  product: string
  action: BillableAction
  providerName: string
  quantity: number
  amount: number
  refundable: boolean
  total: number
}

export class Billable {
  product: string
  action: BillableAction
  providerName: string
  quantity: number
  amount: number
  refundable: boolean
  total: number

  constructor (billable: IBillable) {
    this.product = billable.product
    this.action = billable.action
    this.providerName = billable.providerName
    this.quantity = billable.quantity
    this.amount = billable.amount
    this.refundable = billable.refundable
    this.total = billable.total
  }
}
