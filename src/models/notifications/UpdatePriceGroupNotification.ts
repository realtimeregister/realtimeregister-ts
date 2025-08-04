import { INotification, Notification } from './Notification.ts'

export interface IUpdatePriceGroupNotification extends INotification {
  actionDate?: Date
}

export default class UpdatePriceGroupNotification extends Notification implements IUpdatePriceGroupNotification {
  actionDate?: Date

  constructor (notification: IUpdatePriceGroupNotification) {
    super(notification)
    this.actionDate = notification.actionDate
  }
}
