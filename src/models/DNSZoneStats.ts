export interface IQueries {
  date: Date
  qcount: number
  nxcount: number
}

export interface IDNSZoneStats {
  queries: IQueries[]
}

export default class DNSZoneStats implements IDNSZoneStats {
  queries: IQueries[]

  constructor (zone: DNSZoneStats) {
    this.queries = zone.queries
  }
}
