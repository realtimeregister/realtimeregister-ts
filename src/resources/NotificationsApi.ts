import Base from '@/resources/Base'
import { NotificationListParams } from '@/models/ListParams'
import Page from '@/models/Page'
import Notification, { INotification } from '@/models/notifications/Notification'
import BillingNotification from '@/models/notifications/BillingNotification'
import CreateDomainNotification from '@/models/notifications/CreateDomainNotification'
import DomainExpiryReportNotification from '@/models/notifications/DomainExpiryReportNotification'
import DomainNotification from '@/models/notifications/DomainNotification'
import HostNotification from '@/models/notifications/HostNotification'
import PremiumDomainChangePriceNotification from '@/models/notifications/PremiumDomainChangePriceNotification'
import RenewDomainNotification from '@/models/notifications/RenewDomainNotification'
import SSLCertificateExpiryReportNotification from '@/models/notifications/SSLCertificateExpiryReportNotification'
import SSLCertificateNotification from '@/models/notifications/SSLCertificateNotification'
import TransferDomainNotification from '@/models/notifications/TransferDomainNotification'
import UpdatePriceGroupNotification from '@/models/notifications/UpdatePriceGroupNotification'
import { CancelToken } from 'axios'

const classes = {
  Notification,
  BillingNotification,
  CreateDomainNotification,
  DomainExpiryReportNotification,
  DomainNotification,
  HostNotification,
  PremiumDomainChangePriceNotification,
  RenewDomainNotification,
  SSLCertificateExpiryReportNotification,
  SSLCertificateNotification,
  TransferDomainNotification,
  UpdatePriceGroupNotification
}

export default class NotificationsApi extends Base {
  async get (notification: INotification | number, fields?: string[]): Promise<Notification> {
    return this.axios.get('/customers/' + this.customer + '/notifications/' + ((notification as INotification).id || notification), { params: { fields } })
      .then(response => this.notificationClass(response.data.notificationType, response.data))
  }

  async list (params?: NotificationListParams, cancelToken?: CancelToken): Promise<Page<Notification>> {
    return this.axios.get('/customers/' + this.customer + '/notifications/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Notification[] = (response.data.entities || []).map((data: Notification) => this.notificationClass((data.notificationType as keyof typeof classes), data))
        return new Page<Notification>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async ack (notification: INotification | number): Promise<void> {
    return this.axios.post('/customers/' + this.customer + '/notifications/' + ((notification as INotification).id || notification) + '/ack/', {})
  }

  notificationClass (className: keyof typeof classes, opts: any): Notification {
    if (classes[className]) {
      return new classes[className](opts)
    }

    return new Notification(opts)
  }
}
