export interface INotification {
  id: number
  eventType: string
  notificationType: string
  fireDate: Date
  readDate?: Date
  acknowledgeDate?: Date
  message: string
  reason?: string
  process?: number
  payload?: object
  customer: string,
  isAsync: boolean
}

export class Notification implements INotification {
  id: number
  eventType: string
  notificationType: string
  fireDate: Date
  readDate?: Date
  acknowledgeDate?: Date
  message: string
  reason?: string
  process?: number
  payload?: object
  customer: string
  isAsync: boolean

  constructor (notification: INotification) {
    this.id = notification.id
    this.eventType = notification.eventType
    this.notificationType = notification.notificationType
    this.fireDate = notification.fireDate
    this.readDate = notification.readDate
    this.acknowledgeDate = notification.acknowledgeDate
    this.message = notification.message
    this.reason = notification.reason
    this.process = notification.process
    this.payload = notification.payload
    this.customer = notification.customer
    this.isAsync = notification.isAsync
  }
}

export default Notification
