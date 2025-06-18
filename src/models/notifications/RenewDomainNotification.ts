import { INotification, Notification } from './Notification'

export interface IRenewDomainNotification extends INotification {
  expiryDate?: Date
}

export default class RenewDomainNotification extends Notification implements IRenewDomainNotification {
  expiryDate?: Date

  constructor (notification: IRenewDomainNotification) {
    super(notification)
    this.expiryDate = notification.expiryDate
  }
}
