import Base from '@/resources/Base'
import { DNSZoneListParams } from '@/models/ListParams'
import Page from '@/models/Page'
import { CancelToken } from 'axios'
import DNSZone, { DNSZoneField, IDNSZone, IDNSZoneCreate, IDNSZoneUpdate } from '@/models/DNSZone'
import { ProcessResponse } from '@/models/ProcessResponse'
import DNSZoneStats from '@/models/DNSZoneStats'
import { IProcess } from '@/models/Process'

export default class DnsZoneApi extends Base {
  async get (dnsZone: IDNSZone | number, fields?: DNSZoneField[]): Promise<DNSZone> {
    return this.axios.get('/dns/zones/' + ((dnsZone as IDNSZone).id || dnsZone), { params: { fields } })
      .then(response => new DNSZone(response.data))
  }

  async stats (dnsZone: IDNSZone | number): Promise<DNSZoneStats> {
    return this.axios.get('/dns/zones/' + ((dnsZone as IDNSZone).id || dnsZone) + '/stats')
      .then(response => new DNSZoneStats(response.data))
  }

  async list (params?: DNSZoneListParams, cancelToken?: CancelToken): Promise<Page<DNSZone>> {
    return this.axios.get('/dns/zones/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: DNSZone[] = (response.data.entities || []).map((data: DNSZone) => new DNSZone(data))
        return new Page<DNSZone>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async create (zone: IDNSZoneCreate): Promise<ProcessResponse> {
    const fields = (({ name, service, template, link, master, ns, dnssec, hostMaster, refresh, retry, expire, ttl, records, customer }) => ({ name, service, template, link, master, ns, dnssec, hostMaster, refresh, retry, expire, ttl, records, customer }))(zone)

    return this.axios.post('/dns/zones/', fields)
      .then(response => new ProcessResponse(response))
  }

  async update (zone: IDNSZoneUpdate): Promise<ProcessResponse> {
    const fields = (({ template, link, master, ns, dnssec, hostMaster, refresh, retry, expire, ttl, records }) => ({ template, link, master, ns, dnssec, hostMaster, refresh, retry, expire, ttl, records }))(zone)

    return this.axios.post('/dns/zones/' + zone.id + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  async delete (dnsZone: IDNSZone | number): Promise<ProcessResponse> {
    return this.axios.delete('/dns/zones/' + ((dnsZone as IDNSZone).id || dnsZone))
      .then(response => new ProcessResponse(response))
  }

  async retrieve (dnsZone: IDNSZone | number): Promise<number> {
    return this.axios.post('/dns/zones/' + ((dnsZone as IDNSZone).id || dnsZone) + '/retrieve')
      .then(response => response.status)
  }

  async ackDsUpdate (process: IProcess | number): Promise<void> {
    return this.axios.post('/processes/' + ((process as IProcess).id || process) + '/ack-ds-update')
  }
}
