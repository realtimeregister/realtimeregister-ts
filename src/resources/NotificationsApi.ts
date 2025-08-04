import Base from '@/resources/Base.ts'
import { NotificationListParams } from '@/models/ListParams.ts'
import Page from '@/models/Page.ts'
import Notification, { INotification, NotificationField } from '@/models/notifications/Notification.ts'
import BillingNotification from '@/models/notifications/BillingNotification.ts'
import CreateDomainNotification from '@/models/notifications/CreateDomainNotification.ts'
import DomainExpiryReportNotification from '@/models/notifications/DomainExpiryReportNotification.ts'
import DomainNotification from '@/models/notifications/DomainNotification.ts'
import HostNotification from '@/models/notifications/HostNotification.ts'
import PremiumDomainChangePriceNotification from '@/models/notifications/PremiumDomainChangePriceNotification.ts'
import RenewDomainNotification from '@/models/notifications/RenewDomainNotification.ts'
import SSLCertificateExpiryReportNotification from '@/models/notifications/SSLCertificateExpiryReportNotification.ts'
import SSLCertificateNotification from '@/models/notifications/SSLCertificateNotification.ts'
import TransferDomainNotification from '@/models/notifications/TransferDomainNotification.ts'
import UpdatePriceGroupNotification from '@/models/notifications/UpdatePriceGroupNotification.ts'
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
  async get (notification: INotification | number, fields?: NotificationField[]): Promise<Notification> {
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
