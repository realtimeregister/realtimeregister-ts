import { BillableAction } from '@/models/Billable'

export enum DomainStatusEnum {
  OK = 'Ok',
  INACTIVE = 'Inactive',
  PENDING_TRANSFER = 'Pending transfer',
  CLIENT_TRANSFER_PROHIBITED = 'Client transfer prohibited',
  SERVER_TRANSFER_PROHIBITED = 'Server transfer prohibited',
  REGISTRAR_TRANSFER_PROHIBITED = 'Registrar transfer prohibited',
  PENDING_RENEW = 'Pending renew',
  CLIENT_RENEW_PROHIBITED = 'Client renew prohibited',
  SERVER_RENEW_PROHIBITED = 'Server renew prohibited',
  REGISTRAR_RENEW_PROHIBITED = 'Registrar renew prohibited',
  PENDING_UPDATE = 'Pending update',
  CLIENT_UPDATE_PROHIBITED = 'Client update prohibited',
  SERVER_UPDATE_PROHIBITED = 'Server update prohibited',
  REGISTRAR_UPDATE_PROHIBITED = 'Registrar update prohibited',
  CLIENT_HOLD = 'Client hold',
  SERVER_HOLD = 'Server hold',
  REGISTRAR_HOLD = 'Registrar hold',
  DELETE_REQUESTED = 'Delete requested',
  ADD_PERIOD = 'Add period',
  AUTO_RENEW_PERIOD = 'Auto renew period',
  RENEW_PERIOD = 'Renew period',
  TRANSFER_PERIOD = 'Transfer period',
  REDEMPTION_PERIOD = 'Redemption period',
  PENDING_RESTORE = 'Pending restore',
  PENDING_DELETE = 'Pending delete',
  CLIENT_DELETE_PROHIBITED = 'Client delete prohibited',
  SERVER_DELETE_PROHIBITED = 'Server delete prohibited',
  REGISTRAR_DELETE_PROHIBITED = 'Registrar delete prohibited',
  PENDING_VALIDATION = 'Pending validation',
  PRIVACY_PROTECT_PROHIBITED = 'Privacy protect prohibited',
  EXPIRED = 'Expired',
  IRTPC_TRANSFER_PROHIBITED = 'IRTPC transfer prohibited',
}

export interface IBillableDomain {
  product: string
  action: BillableAction
  quantity?: number
}

enum ContactRole {
  ADMIN = 'ADMIN',
  BILLING = 'BILLING',
  TECH = 'TECH'
}

enum DesignatedAgent {
  NONE = 'NONE',
  OLD = 'OLD',
  NEW = 'NEW',
  BOTH = 'BOTH'
}

enum TransferContacts {
  REGISTRANT = 'REGISTRANT',
  ADMIN = 'ADMIN'
}

interface IZone {
  template: string
  link?: boolean
  service?: boolean
  dnssec?: boolean
  master?: string
}

interface IContacts {
  role: ContactRole
  handle: string
}

export interface IKeyData {
  protocol: number
  flags: number
  algorithm: number
  publicKey: string
}

interface IDsData {
  keyTag: number
  algorithm: number
  digestType: number
  digest: string
}

export interface IDomainRegisterTransfer {
  domainName: string
  registrant: string
  authcode?: string
  autoRenew?: boolean
  privacyProtect?: boolean
  contacts?: IContacts[]
  period?: number
  ns?: string[]
  zone?: IZone
  languageCode?: string
  keyData?: IKeyData[]
  billables?: IBillableDomain[]
}

export interface IDomainRegister extends IDomainRegisterTransfer {
  skipValidation?: boolean
}

export interface IDomainTransfer extends IDomainRegisterTransfer {
  transferContacts?: TransferContacts
  designatedAgent?: DesignatedAgent
}

export interface IDomainPushTransfer {
  domainName: string
  recipient: string
}

export interface IDomainUpdate {
  domainName: string
  registrant?: string
  privacyProtect?: boolean
  authcode?: string
  autoRenew?: boolean
  autoRenewPeriod?: number
  ns?: string[]
  status?: DomainStatusEnum[]
  designatedAgent?: DesignatedAgent
  zone?: IZone
  contacts?: IContacts[]
  keyData?: IKeyData[]
  dsData?: IDsData[]
  billables?: IBillableDomain[]
}

export interface IDomainRenew {
  domainName: string
  period: number
  billables?: IBillableDomain[]
}

export interface IDomainRestore {
  domainName: string
  reason: string
  billables?: IBillableDomain[]
}

export interface IDomainCheckResponse {
  available: boolean
  reason: string
  premium: boolean
  currency: string
  price: number
}

export interface IDomain {
  domainName: string
  registry: string
  customer: string
  registrant: string
  privacyProtect: boolean
  status: DomainStatusEnum[]
  authcode?: string
  languageCode?: string
  autoRenew: boolean
  autoRenewPeriod: number
  ns?: string[]
  childHosts?: string[]
  createdDate: Date
  updatedDate?: Date
  expiryDate: Date
  premium: boolean
  gateway: boolean
  zone?: IZone
  contacts?: IContacts[]
  keyData?: IKeyData[]
  dsData?: IDsData[]
}

export default class Domain implements IDomain {
  domainName: string
  registry: string
  customer: string
  registrant: string
  privacyProtect: boolean
  status: DomainStatusEnum[]
  authcode?: string
  languageCode?: string
  autoRenew: boolean
  autoRenewPeriod: number
  ns?: string[]
  childHosts?: string[]
  createdDate: Date
  updatedDate?: Date
  expiryDate: Date
  premium: boolean
  gateway: boolean
  zone?: IZone
  contacts?: IContacts[]
  keyData?: IKeyData[]
  dsData?: IDsData[]

  constructor (domain: IDomain) {
    this.domainName = domain.domainName
    this.registry = domain.registry
    this.customer = domain.customer
    this.registrant = domain.registrant
    this.privacyProtect = domain.privacyProtect
    this.status = domain.status || []
    this.authcode = domain.authcode
    this.languageCode = domain.languageCode
    this.autoRenew = domain.autoRenew
    this.autoRenewPeriod = domain.autoRenewPeriod
    this.ns = domain.ns
    this.childHosts = domain.childHosts
    this.createdDate = domain.createdDate
    this.updatedDate = domain.updatedDate
    this.expiryDate = domain.expiryDate
    this.premium = domain.premium
    this.gateway = domain.gateway
    this.zone = domain.zone
    this.contacts = domain.contacts
    this.keyData = domain.keyData
    this.dsData = domain.dsData
  }
}
