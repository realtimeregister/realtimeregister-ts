import { INotification, Notification } from './Notification'

export interface IHostNotification extends INotification {
  hostName?: string
}

export default class HostNotification extends Notification implements IHostNotification {
  hostName?: string

  constructor (notification: IHostNotification) {
    super(notification)
    this.hostName = notification.hostName
  }
}
