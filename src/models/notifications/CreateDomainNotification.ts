import { INotification, Notification } from './Notification'

export interface ICreateDomainNotification extends INotification {
  createdDate?: Date
  expiryDate?: Date
}

export default class CreateDomainNotification extends Notification implements ICreateDomainNotification {
  createdDate?: Date
  expiryDate?: Date

  constructor (notification: ICreateDomainNotification) {
    super(notification)
    this.createdDate = notification.createdDate
    this.expiryDate = notification.expiryDate
  }
}
