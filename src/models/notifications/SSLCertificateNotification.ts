import { INotification, Notification } from './Notification'

export interface ISSLCertificateNotification extends INotification {
  provider?: string
  product?: string
  validationType?: string
  providerId?: number
  expiryDate?: Date
  certificateId?: number
}

export default class SSLCertificateNotification extends Notification implements ISSLCertificateNotification {
  provider?: string
  product?: string
  validationType?: string
  providerId?: number
  expiryDate?: Date
  certificateId?: number

  constructor (notification: ISSLCertificateNotification) {
    super(notification)
    this.provider = notification.provider
    this.product = notification.product
    this.validationType = notification.validationType
    this.providerId = notification.providerId
    this.expiryDate = notification.expiryDate
    this.certificateId = notification.certificateId
  }
}
