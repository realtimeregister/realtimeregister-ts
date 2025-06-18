import { INotification, Notification } from './Notification'

export interface IBillingNotification extends INotification {
  watermark?: number
  currency?: string
  balance?: number
  negativeSinceDate?: Date
  negativeCurrency?: string
  negativeLimit?: number
  negativeSoftLimit?: number
}

export default class BillingNotification extends Notification implements IBillingNotification {
  watermark?: number
  currency?: string
  balance?: number
  negativeSinceDate?: Date
  negativeCurrency?: string
  negativeLimit?: number
  negativeSoftLimit?: number

  constructor (notification: IBillingNotification) {
    super(notification)
    this.watermark = notification.watermark
    this.currency = notification.currency
    this.balance = notification.balance
    this.negativeSinceDate = notification.negativeSinceDate
    this.negativeCurrency = notification.negativeCurrency
    this.negativeLimit = notification.negativeLimit
    this.negativeSoftLimit = notification.negativeSoftLimit
  }
}
