import { INotification, Notification } from './Notification.ts'

export interface ITransferDomainNotification extends INotification {
  requestedDate?: Date
  actionDate?: Date
  expiryDate?: Date
  transferType?: string
}

export default class TransferDomainNotification extends Notification implements ITransferDomainNotification {
  requestedDate?: Date
  actionDate?: Date
  expiryDate?: Date
  transferType?: string

  constructor (notification: ITransferDomainNotification) {
    super(notification)
    this.requestedDate = notification.requestedDate
    this.actionDate = notification.actionDate
    this.expiryDate = notification.expiryDate
    this.transferType = notification.transferType
  }
}
