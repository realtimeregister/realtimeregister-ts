import { INotification, Notification } from './Notification'

export interface ISSLCertificateExpiryReportNotification extends INotification {
  startDate?: Date
  endDate?: Date
}

export default class SSLCertificateExpiryReportNotification extends Notification implements ISSLCertificateExpiryReportNotification {
  startDate?: Date
  endDate?: Date

  constructor (notification: ISSLCertificateExpiryReportNotification) {
    super(notification)
    this.startDate = notification.startDate
    this.endDate = notification.endDate
  }
}
