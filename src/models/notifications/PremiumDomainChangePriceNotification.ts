import { INotification, Notification } from './Notification.ts'

export interface IPremiumDomainChangePriceNotification extends INotification {
  currency?: string
}

export default class PremiumDomainChangePriceNotification extends Notification implements IPremiumDomainChangePriceNotification {
  currency?: string

  constructor (notification: IPremiumDomainChangePriceNotification) {
    super(notification)
    this.currency = notification.currency
  }
}
