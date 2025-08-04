import { INotification, Notification } from './Notification.ts'

export interface IDomainExpiryReportNotification extends INotification {
  startDate?: Date
  endDate?: Date
}

export default class DomainExpiryReportNotification extends Notification implements IDomainExpiryReportNotification {
  startDate?: Date
  endDate?: Date

  constructor (notification: IDomainExpiryReportNotification) {
    super(notification)
    this.startDate = notification.startDate
    this.endDate = notification.endDate
  }
}
