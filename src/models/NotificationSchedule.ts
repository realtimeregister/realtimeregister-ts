export interface INotificationSchedule {
  id: number
  eventType: string
  schedule: string
  periodStartOffset: number
  periodEndOffset: number
}

export interface INotificationScheduleCreate {
  eventType: string
  schedule: string
  periodStartOffset: number
  periodEndOffset: number
}

export default class NotificationSchedule implements INotificationSchedule {
  id: number
  eventType: string
  schedule: string
  periodStartOffset: number
  periodEndOffset: number

  constructor (notificationSchedule: INotificationSchedule) {
    this.id = notificationSchedule.id
    this.eventType = notificationSchedule.eventType
    this.schedule = notificationSchedule.schedule
    this.periodStartOffset = notificationSchedule.periodStartOffset
    this.periodEndOffset = notificationSchedule.periodEndOffset
  }
}
