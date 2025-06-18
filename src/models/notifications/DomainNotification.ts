import { INotification, Notification } from './Notification'

export interface IDomainNotification extends INotification {
  domainName?: string
  subjectStatus?: string
}

export default class DomainNotification extends Notification implements IDomainNotification {
  domainName?: string
  subjectStatus?: string

  constructor (notification: IDomainNotification) {
    super(notification)
    this.domainName = notification.domainName
    this.subjectStatus = notification.subjectStatus
  }
}
