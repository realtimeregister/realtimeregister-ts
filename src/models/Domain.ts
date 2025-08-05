import { BillableAction } from '@/models/Billable.ts'

export enum DomainStatusEnum {
  OK = 'OK',
  INACTIVE = 'INACTIVE',
  PENDING_TRANSFER = 'PENDING_TRANSFER',
  CLIENT_TRANSFER_PROHIBITED = 'CLIENT_TRANSFER_PROHIBITED',
  SERVER_TRANSFER_PROHIBITED = 'SERVER_TRANSFER_PROHIBITED',
  REGISTRAR_TRANSFER_PROHIBITED = 'REGISTRAR_TRANSFER_PROHIBITED',
  PENDING_RENEW = 'PENDING_RENEW',
  CLIENT_RENEW_PROHIBITED = 'CLIENT_RENEW_PROHIBITED',
  SERVER_RENEW_PROHIBITED = 'SERVER_RENEW_PROHIBITED',
  REGISTRAR_RENEW_PROHIBITED = 'REGISTRAR_RENEW_PROHIBITED',
  PENDING_UPDATE = 'PENDING_UPDATE',
  CLIENT_UPDATE_PROHIBITED = 'CLIENT_UPDATE_PROHIBITED',
  SERVER_UPDATE_PROHIBITED = 'SERVER_UPDATE_PROHIBITED',
  REGISTRAR_UPDATE_PROHIBITED = 'REGISTRAR_UPDATE_PROHIBITED',
  CLIENT_HOLD = 'CLIENT_HOLD',
  SERVER_HOLD = 'SERVER_HOLD',
  REGISTRAR_HOLD = 'REGISTRAR_HOLD',
  DELETE_REQUESTED = 'DELETE_REQUESTED',
  ADD_PERIOD = 'ADD_PERIOD',
  AUTO_RENEW_PERIOD = 'AUTO_RENEW_PERIOD',
  RENEW_PERIOD = 'RENEW_PERIOD',
  TRANSFER_PERIOD = 'TRANSFER_PERIOD',
  REDEMPTION_PERIOD = 'REDEMPTION_PERIOD',
  PENDING_RESTORE = 'PENDING_RESTORE',
  PENDING_DELETE = 'PENDING_DELETE',
  CLIENT_DELETE_PROHIBITED = 'CLIENT_DELETE_PROHIBITED',
  SERVER_DELETE_PROHIBITED = 'SERVER_DELETE_PROHIBITED',
  REGISTRAR_DELETE_PROHIBITED = 'REGISTRAR_DELETE_PROHIBITED',
  PENDING_VALIDATION = 'PENDING_VALIDATION',
  PRIVACY_PROTECT_PROHIBITED = 'PRIVACY_PROTECT_PROHIBITED',
  EXPIRED = 'EXPIRED',
  IRTPC_TRANSFER_PROHIBITED = 'IRTPC_TRANSFER_PROHIBITED',
}

export interface IBillableDomain {
  product: string
  action: BillableAction
  quantity?: number
}

export enum ContactRole {
  ADMIN = 'ADMIN',
  BILLING = 'BILLING',
  TECH = 'TECH'
}

export enum DesignatedAgent {
  NONE = 'NONE',
  OLD = 'OLD',
  NEW = 'NEW',
  BOTH = 'BOTH'
}

export enum TransferContacts {
  REGISTRANT = 'REGISTRANT',
  ADMIN = 'ADMIN'
}

export interface IZone {
  id?: number
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

export interface IDsData {
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

export type DomainField = keyof IDomain
export type DomainFilterField = Exclude<DomainField, 'keyData' | 'dsData' | 'contacts'> | 'registrant' | 'tech' | 'billing' | 'admin'

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
