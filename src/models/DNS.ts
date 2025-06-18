export enum DNSRecordType {
  A = 'A',
  MX = 'MX',
  CNAME = 'CNAME',
  AAAA = 'AAAA',
  URL = 'URL',
  MBOXFW = 'MBOXFW',
  HINFO = 'HINFO',
  NAPTR = 'NAPTR',
  NS = 'NS',
  SRV = 'SRV',
  CAA = 'CAA',
  TLSA = 'TLSA',
  TXT = 'TXT',
  SOA = 'SOA',
  ALIAS = 'ALIAS',
  DNSKEY = 'DNSKEY',
  CERT = 'CERT',
  DS = 'DS',
  LOC = 'LOC',
  SSHFP = 'SSHFP',
  URI = 'URI'
}

export interface IDNSRecord {
  name: string
  type: DNSRecordType
  content: string
  ttl: number
  prio?: number
}

export class DNSRecord implements IDNSRecord {
  name: string
  type: DNSRecordType
  content: string
  ttl: number
  prio?: number

  constructor (record: IDNSRecord) {
    this.name = record.name
    this.type = record.type
    this.content = record.content
    this.ttl = record.ttl
    this.prio = record.prio
  }
}
