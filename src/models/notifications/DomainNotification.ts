import { INotification, Notification, SubjectStatus } from './Notification.ts'

export interface IDomainNotification extends INotification {
  domainName?: string
  subjectStatus?: SubjectStatus
}

export default class DomainNotification extends Notification implements IDomainNotification {
  domainName?: string
  subjectStatus?: SubjectStatus

  constructor (notification: IDomainNotification) {
    super(notification)
    this.domainName = notification.domainName
    this.subjectStatus = notification.subjectStatus
  }
}
