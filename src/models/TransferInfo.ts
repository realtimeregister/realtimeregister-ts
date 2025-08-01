export enum TransferLogStatus {
  'pendingwhois' = 'pendingwhois',
  'pendingfoa' = 'pendingfoa',
  'pendingvalidation' = 'pendingvalidation',
  'pending' = 'pending',
  'approved' = 'approved',
  'cancelled' = 'cancelled',
  'rejected' = 'rejected',
  'failed' = 'failed',
  'completed' = 'completed',
}

export interface TransferLog {
  date: Date
  status: TransferLogStatus
  message: string
}

export enum TransferType {
  'IN' = 'IN',
  'OUT' = 'OUT',
}

export interface ITransferInfo {
  domainName: string
  registrar: string
  status: string
  requestedDate: Date
  actionDate?: Date
  expiryDate?: Date
  type: TransferType
  processId: number
  log?: TransferLog
}

export default class TransferInfo implements ITransferInfo {
  domainName: string
  registrar: string
  status: string
  requestedDate: Date
  actionDate?: Date
  expiryDate?: Date
  type: TransferType
  processId: number
  log?: TransferLog

  constructor (info: ITransferInfo) {
    this.domainName = info.domainName
    this.registrar = info.registrar
    this.status = info.status
    this.requestedDate = info.requestedDate
    this.actionDate = info.actionDate
    this.expiryDate = info.expiryDate
    this.type = info.type
    this.processId = info.processId
    this.log = info.log
  }
}
