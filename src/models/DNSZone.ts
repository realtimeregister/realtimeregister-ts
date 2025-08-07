import { DNSRecord, DNSRecordType, IDNSRecord } from '@/models/DNS.ts'
import { IKeyData } from '@/models/Domain.ts'

export enum ZoneService {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  SECTIGO = 'SECTIGO'
}

export interface IDNSZoneCreate {
  name: string
  service: ZoneService
  template?: string
  link?: boolean
  master?: string
  ns?: string[]
  dnssec?: boolean
  hostMaster?: string
  refresh?: number
  retry?: number
  expire?: number
  ttl?: number
  records?: DNSRecord[]
  customer?: string
}

export interface IDNSZoneUpdate {
  id: number
  template?: string
  link?: boolean
  master?: string
  ns?: string[]
  dnssec?: boolean
  hostMaster?: string
  refresh?: number
  retry?: number
  expire?: number
  ttl?: number
  records?: DNSRecord[]
}

export interface IDNSZone extends IDNSZoneCreate {
  id: number
  defaultRecords: IDNSRecord[]
  keyData?: IKeyData[]
  customer: string
  createdDate: Date
  updatedDate?: Date
  deletionDate?: Date
  managed: boolean
}

export type DNSZoneField = keyof IDNSZone
export type DNSZoneFilterField = Extract<
  DNSZoneField,
  'id'
  | 'name'
  | 'createdDate'
  | 'updatedDate'
  | 'deletionDate'
  | 'service'
  | 'template'
  | 'master'
  | 'ns'
  | 'dnssec'
  | 'managed'
  | 'content'
  | 'publicKey'
>

export default class DNSZone implements IDNSZone {
  id: number
  name: string
  service: ZoneService
  template?: string
  link?: boolean
  master?: string
  ns?: string[]
  dnssec?: boolean
  hostMaster: string
  refresh: number
  retry: number
  expire: number
  ttl: number
  defaultRecords: IDNSRecord[]
  records?: DNSRecord[]
  keyData?: IKeyData[]
  customer: string
  createdDate: Date
  updatedDate?: Date
  deletionDate?: Date
  managed: boolean

  constructor (zone: DNSZone) {
    this.id = zone.id
    this.name = zone.name
    this.service = zone.service
    this.template = zone.template
    this.master = zone.master
    this.ns = zone.ns
    this.dnssec = zone.dnssec
    this.hostMaster = zone.hostMaster
    this.refresh = zone.refresh
    this.retry = zone.retry
    this.expire = zone.expire
    this.ttl = zone.ttl
    this.customer = zone.customer
    this.createdDate = zone.createdDate ? new Date(zone.createdDate) : zone.createdDate
    this.updatedDate = zone.updatedDate ? new Date(zone.updatedDate) : zone.updatedDate
    this.deletionDate = zone.deletionDate ? new Date(zone.deletionDate) : zone.deletionDate
    this.managed = zone.managed
    this.keyData = zone.keyData

    if (zone.defaultRecords) {
      this.defaultRecords = zone.defaultRecords.sort(function (a, b) {
        if (a.type === b.type) {
          return a.content > b.content ? 1 : -1
        }
        if (a.type === DNSRecordType.SOA) {
          return -1
        }
        if (b.type === DNSRecordType.SOA) {
          return 1
        }
        return a.type > b.type ? 1 : -1
      }).map(a => new DNSRecord(a))
    } else {
      this.defaultRecords = zone.defaultRecords
    }

    if (zone.records) {
      this.records = zone.records.sort(
        function (a, b) {
          if (a.name === b.name) {
            if (a.type === b.type) {
              if (a.prio === undefined || b.prio === undefined || a.prio === b.prio) {
                return a.content > b.content ? 1 : -1
              }
              return a.prio > b.prio ? 1 : -1
            }
            return a.type > b.type ? 1 : -1
          }
          if (a.name === '##DOMAIN##') {
            return -1
          }
          if (b.name === '##DOMAIN##') {
            return 1
          }
          return a.name > b.name ? 1 : -1
        }
      ).map(a => new DNSRecord(a))
    }
  }
}
