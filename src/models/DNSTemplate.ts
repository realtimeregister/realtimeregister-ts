import { DNSRecord, DNSRecordType, IDNSRecord } from '@/models/DNS.ts'

export interface IDNSTemplateCreate {
  name: string
  createdDate: Date
  updatedDate?: Date
  hostMaster: string
  refresh: number
  retry: number
  expire: number
  ttl: number
  records?: IDNSRecord[]
}

export type IDNSTemplateUpdate = IDNSTemplateCreate

export interface IDNSTemplate extends IDNSTemplateCreate {
  defaultRecords: IDNSRecord[]
}

export type DNSTemplateField = keyof IDNSTemplate
export type DNSTemplateFilterField = Extract<DNSTemplateField, 'name' | 'updatedDate' | 'createdDate'>

export default class DNSTemplate implements IDNSTemplate {
  name: string
  createdDate: Date
  updatedDate?: Date
  hostMaster: string
  refresh: number
  retry: number
  expire: number
  ttl: number
  defaultRecords: DNSRecord[]
  records?: DNSRecord[]

  constructor (dns: IDNSTemplate) {
    this.name = dns.name
    this.hostMaster = dns.hostMaster
    this.refresh = dns.refresh
    this.retry = dns.retry
    this.expire = dns.expire
    this.ttl = dns.ttl
    this.createdDate = dns.createdDate ? new Date(dns.createdDate) : dns.createdDate
    this.updatedDate = dns.updatedDate ? new Date(dns.updatedDate) : dns.updatedDate
    if (dns.defaultRecords) {
      this.defaultRecords = dns.defaultRecords.sort(function (a, b) {
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
      this.defaultRecords = dns.defaultRecords
    }

    if (dns.records) {
      this.records = dns.records.sort(
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
