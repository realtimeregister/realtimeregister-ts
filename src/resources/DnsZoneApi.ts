import Base from '@/resources/Base.ts'
import { DNSZoneListParams } from '@/models/ListParams.ts'
import Page from '@/models/Page.ts'
import { CancelToken } from 'axios'
import DNSZone, { DNSZoneField, IDNSZone, IDNSZoneCreate, IDNSZoneUpdate } from '@/models/DNSZone.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'
import DNSZoneStats from '@/models/DNSZoneStats.ts'
import { IProcess } from '@/models/process/Process.ts'

export default class DnsZoneApi extends Base {
  /**
   * Get a DNS zone.
   * @link https://dm.realtimeregister.com/docs/api/dns/zones/get
   * @param dnsZone - DNS zone object, or id.
   * @param fields - Fields to include in response.
   */
  async get (dnsZone: IDNSZone | number, fields?: DNSZoneField[]): Promise<DNSZone> {
    return this.axios.get('/dns/zones/' + ((dnsZone as IDNSZone).id || dnsZone), { params: { fields } })
      .then(response => new DNSZone(response.data))
  }

  /**
   * Get DNS zone statistics.
   * @link https://dm.realtimeregister.com/docs/api/dns/zones/stats
   * @param dnsZone - DNS zone object, or id.
   */
  async stats (dnsZone: IDNSZone | number): Promise<DNSZoneStats> {
    return this.axios.get('/dns/zones/' + ((dnsZone as IDNSZone).id || dnsZone) + '/stats')
      .then(response => new DNSZoneStats(response.data))
  }

  /**
   * List DNS zones based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/dns/zones/list
   * @see DNSZoneListParams
   * @param params - Object containing parameters passed to the listing, see DNSZoneListParams.
   * @param cancelToken
   */
  async list (params?: DNSZoneListParams, cancelToken?: CancelToken): Promise<Page<DNSZone>> {
    return this.axios.get('/dns/zones/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: DNSZone[] = (response.data.entities || []).map((data: DNSZone) => new DNSZone(data))
        return new Page<DNSZone>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Create a new DNS zone.
   * @link https://dm.realtimeregister.com/docs/api/dns/zones/create
   * @param zone - Data for the new DNS zone.
   */
  async create (zone: IDNSZoneCreate): Promise<ProcessResponse> {
    const fields = (({ name, service, template, link, master, ns, dnssec, hostMaster, refresh, retry, expire, ttl, records, customer }) => ({ name, service, template, link, master, ns, dnssec, hostMaster, refresh, retry, expire, ttl, records, customer }))(zone)

    return this.axios.post('/dns/zones/', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Update an existing DNS zone. Will determine the zone to update based on the id property.
   * @link https://dm.realtimeregister.com/docs/api/dns/zones/update
   * @param zone - Data for the DNS zone to update.
   */
  async update (zone: IDNSZoneUpdate): Promise<ProcessResponse> {
    const fields = (({ template, link, master, ns, dnssec, hostMaster, refresh, retry, expire, ttl, records }) => ({ template, link, master, ns, dnssec, hostMaster, refresh, retry, expire, ttl, records }))(zone)

    return this.axios.post('/dns/zones/' + zone.id + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Delete an existing DNS zone.
   * @link https://dm.realtimeregister.com/docs/api/dns/zones/delete
   * @param dnsZone
   */
  async delete (dnsZone: IDNSZone | number): Promise<ProcessResponse> {
    return this.axios.delete('/dns/zones/' + ((dnsZone as IDNSZone).id || dnsZone))
      .then(response => new ProcessResponse(response))
  }

  /**
   * Initiate DNS zone retrieval from the master. Normally initiated via DNS NOTIFY.
   * @link https://dm.realtimeregister.com/docs/api/dns/zones/retrieve
   * @param dnsZone - DNS zone object, or id.
   */
  async retrieve (dnsZone: IDNSZone | number): Promise<number> {
    return this.axios.post('/dns/zones/' + ((dnsZone as IDNSZone).id || dnsZone) + '/retrieve')
      .then(response => response.status)
  }

  /**
   * Notify the DNS service that the DS record / Key Data has been updated at the domain provider and the key rollover can continue.
   * @link https://dm.realtimeregister.com/docs/api/dns/ack-ds-update
   * @param process - Process object, or id.
   */
  async ackDsUpdate (process: IProcess | number): Promise<void> {
    return this.axios.post('/processes/' + ((process as IProcess).id || process) + '/ack-ds-update')
  }
}
