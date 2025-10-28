import { Billable, IBillable } from '@/models/Billable.ts'

export enum ProcessStatus {
  NEW = 'NEW',
  VALIDATED = 'VALIDATED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  INVALID = 'INVALID',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  IN_DOUBT = 'IN_DOUBT',
  SCHEDULED = 'SCHEDULED',
  SUSPENDED = 'SUSPENDED'
}

export enum ResumeType {
  PROVIDER = 'PROVIDER',
  TIMER = 'TIMER',
  MANUAL = 'MANUAL',
  INTERNAL = 'INTERNAL',
  RESEND = 'RESEND',
  CANCEL = 'CANCEL'
}

export interface IProcess {
  id: number
  action: string
  billables?: IBillable[]
  command: object // @todo map based on commandType
  createdDate: Date
  customer: string
  identifier: string
  status: ProcessStatus
  statusDetail?: string
  resumeTypes?: ResumeType[]
  startedDate?: Date
  type: string
  updatedDate?: Date
  user: string
  reservation?: Map<string, number>
  transaction?: Map<string, number>
  refund?: Map<string, number>
  error?: Record<string, any>
}

export type ProcessField = keyof IProcess
export type ProcessFilterField =
  Exclude<ProcessField,
    'error'
    | 'reservation'
    | 'transaction'
    | 'refund'
    | 'billables'
    | 'customer'
  >
  | 'billableAction' | 'billableProvider' | 'billableQuantity' | 'detailStatus'

export default class Process implements Omit<IProcess, 'error'> {
  id: number
  action: string
  billables?: Billable[]
  command: object // @todo map based on commandType
  createdDate: Date
  customer: string
  identifier: string
  status: ProcessStatus
  statusDetail?: string
  resumeTypes?: ResumeType[]
  startedDate?: Date
  type: string
  updatedDate?: Date
  user: string
  reservation?: Map<string, number>
  transaction?: Map<string, number>
  refund?: Map<string, number>
  error?: Record<string, any>

  constructor (process: IProcess) {
    this.id = process.id
    this.action = process.action
    if (process.billables) {
      this.billables = process.billables.map(d => new Billable(d))
    }
    this.command = process.command
    this.createdDate = process.createdDate ? new Date(process.createdDate) : process.createdDate
    this.customer = process.customer
    this.identifier = process.identifier
    this.status = process.status
    this.statusDetail = process.statusDetail
    this.resumeTypes = process.resumeTypes
    this.startedDate = process.startedDate ? new Date(process.startedDate) : process.startedDate
    this.type = process.type
    this.updatedDate = process.updatedDate ? new Date(process.updatedDate) : process.updatedDate
    this.user = process.user
    if (process.reservation) {
      this.reservation = new Map(Object.entries(process.reservation))
    }
    if (process.transaction) {
      this.transaction = new Map(Object.entries(process.transaction))
    }
    if (process.refund) {
      this.refund = new Map(Object.entries(process.refund))
    }
    this.error = process.error
  }
}
