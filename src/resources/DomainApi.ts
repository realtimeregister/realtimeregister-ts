import Base from '@/resources/Base.ts'
import Domain, {
  DomainField,
  IDomain, IDomainCheckResponse,
  IDomainPushTransfer,
  IDomainRegister,
  IDomainRenew,
  IDomainRestore,
  IDomainTransfer,
  IDomainUpdate
} from '@/models/Domain.ts'
import Page from '@/models/Page.ts'
import { DomainListParams } from '@/models/ListParams.ts'
import { CancelToken } from 'axios'
import {
  ProcessResponse
} from '@/models/process/ProcessResponse.ts'
import {
  DomainCreateProcessResponse,
  DomainRestoreProcessResponse,
  DomainUpdateProcessResponse,
  DomainTransferProcessResponse,
  DomainRenewProcessResponse
} from '@/models/process/DomainProcess.ts'
import Quote from '@/models/Quote.ts'
import TransferInfo from '@/models/TransferInfo.ts'
import DNSZone, { type IDNSManagedZoneUpdate } from '@/models/DNSZone.ts'

export default class DomainApi extends Base {
  /**
   * Get a domain
   * @link https://dm.realtimeregister.com/docs/api/domains/get
   * @param domain - Domain name, or object.
   * @param fields - Fields to include in the response.
   */
  async get (domain: IDomain | string, fields?: DomainField[]): Promise<Domain> {
    return this.axios.get('/domains/' + ((domain as IDomain).domainName || domain), { params: { fields } })
      .then(response => new Domain(response.data))
  }

  /**
   * List domains within your account.
   * @link https://dm.realtimeregister.com/docs/api/domains/list
   * @see DomainListParams
   * @param params - Object containing parameters passed to the listing, see DomainListParams.
   * @param cancelToken
   */
  async list (params?: DomainListParams, cancelToken?: CancelToken): Promise<Page<Domain>> {
    return this.axios.get('/domains/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Domain[] = (response.data.entities || []).map((data: IDomain) => new Domain(data))
        return new Page<Domain>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Delete a domain.
   * @link https://dm.realtimeregister.com/docs/api/domains/delete
   * @param domainName - Domain name, or object.
   */
  async delete (domainName: IDomain | string): Promise<ProcessResponse> {
    return this.axios.delete('/domains/' + ((domainName as IDomain).domainName || domainName))
      .then(response => new ProcessResponse(response))
  }

  /**
   * Check the availability of a domain name.
   * @link https://dm.realtimeregister.com/docs/api/domains/check
   * @param domain - Domain name, or object.
   * @param languageCode - For IDN domains, the TLD specific language code for the domain name
   */
  async check (domain: IDomain | string, languageCode?: string): Promise<IDomainCheckResponse> {
    return this.axios.get<IDomainCheckResponse>('/domains/' + ((domain as IDomain).domainName || domain + '/check'), { params: languageCode ? { languageCode } : undefined })
      .then((response): IDomainCheckResponse => {
        return response.data
      })
  }

  /**
   * Register a new domain within your account.
   * @link https://dm.realtimeregister.com/docs/api/domains/register
   * @param data - Object containing the domain registration details.
   * @param quote - If true, validate the request and request a quote for the action. Registration will not be executed.
   */
  async register (data: IDomainRegister, quote?: boolean): Promise<DomainCreateProcessResponse | Quote> {
    const fields = (({
      authcode,
      registrant,
      contacts,
      period,
      ns,
      zone,
      keyData,
      privacyProtect,
      languageCode,
      billables,
      autoRenew,
      skipValidation
    },
    customer
    ) => ({
      authcode,
      registrant,
      contacts,
      period,
      ns,
      zone,
      keyData,
      privacyProtect,
      languageCode,
      billables,
      autoRenew,
      skipValidation,
      customer
    }))(data, this.customer)
    return this.axios.post('/domains/' + data.domainName, fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new DomainCreateProcessResponse(response))
  }

  /**
   * Transfer a domain to your account.
   * @link https://dm.realtimeregister.com/docs/api/domains/transfer
   * @param data - Object containing the domain transfer details.
   * @param quote - If true, validate the request and request a quote for the action. Transfer will not be executed.
   */
  async transfer (data: IDomainTransfer, quote?: boolean): Promise<DomainTransferProcessResponse | Quote> {
    const fields = (({
      authcode,
      registrant,
      contacts,
      period,
      ns,
      zone,
      keyData,
      privacyProtect,
      transferContacts,
      designatedAgent,
      languageCode,
      billables,
      autoRenew
    },
    customer
    ) => ({
      authcode,
      registrant,
      contacts,
      period,
      ns,
      zone,
      keyData,
      privacyProtect,
      transferContacts,
      designatedAgent,
      languageCode,
      billables,
      autoRenew,
      customer
    }))(data, this.customer)
    return this.axios.post('/domains/' + data.domainName + '/transfer', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new DomainTransferProcessResponse(response))
  }

  /**
   * Update a domain.
   * @param data - Object containing the domain update details.
   * @param quote - If true, validate the request and request a quote for the action. Update will not be executed.
   */
  async update (data: IDomainUpdate, quote?: boolean): Promise<DomainUpdateProcessResponse | Quote> {
    const fields = (({
      registrant,
      privacyProtect,
      authcode,
      autoRenew,
      autoRenewPeriod,
      ns,
      status,
      designatedAgent,
      zone,
      contacts,
      keyData,
      dsData,
      billables
    }) => ({
      registrant,
      privacyProtect,
      authcode,
      autoRenew,
      autoRenewPeriod,
      ns,
      status,
      designatedAgent,
      zone,
      contacts,
      keyData,
      dsData,
      billables
    }))(data)
    return this.axios.post('/domains/' + data.domainName + '/update', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new DomainUpdateProcessResponse(response))
  }

  /**
   * Initiate a domain push transfer.
   * @link https://dm.realtimeregister.com/docs/api/domains/pushtransfer
   * @param data - Object containing the domain push transfer details.
   */
  async pushTransfer (data: IDomainPushTransfer): Promise<ProcessResponse> {
    const fields = (({ recipient }) => ({ recipient }))(data)
    return this.axios.post('/domains/' + data.domainName + '/transfer/push', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Renew a domain.
   * @link https://dm.realtimeregister.com/docs/api/domains/renew
   * @param data - Object containing the domain renew details.
   * @param quote - If true, validate the request and request a quote for the action. Renew will not be executed.
   */
  async renew (data: IDomainRenew, quote?: boolean): Promise<DomainRenewProcessResponse | Quote> {
    const fields = (({ period, billables }) => ({ period, billables }))(data)
    return this.axios.post('/domains/' + data.domainName + '/renew', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new DomainRenewProcessResponse(response))
  }

  /**
   * Restore a domain.
   * @link https://dm.realtimeregister.com/docs/api/domains/restore
   * @param data - Object containing the domain restore details.
   * @param quote - If true, validate the request and request a quote for the action. Restore will not be executed.
   */
  async restore (data: IDomainRestore, quote?: boolean): Promise<DomainRestoreProcessResponse | Quote> {
    const fields = (({ reason, billables }) => ({ reason, billables }))(data)
    return this.axios.post('/domains/' + data.domainName + '/restore', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new DomainRestoreProcessResponse(response))
  }

  /**
   * Get the DNS zone for a managed domain.
   * @link https://dm.realtimeregister.com/docs/api/dns/zones/get
   * @see DnsZoneApi.get
   * @param domain - Domain name, or object.
   * @param fields - Fields to include in the response.
   */
  async zoneInfo (domain: IDomain | string, fields?: string[]): Promise<DNSZone> {
    return this.axios.get('/domains/' + ((domain as IDomain).domainName || domain + '/zone'), { params: { fields } })
      .then(response => new DNSZone(response.data))
  }

  /**
   * Update the DNS zone for a managed domain.
   * @link https://dm.realtimeregister.com/docs/api/dns/zones/update
   * @see DnsZoneApi.update
   * @param domain - Domain name, or object.
   * @param zone - Object containing the DNS zone update details.
   */
  async zoneUpdate (domain: IDomain | string, zone: IDNSManagedZoneUpdate): Promise<ProcessResponse> {
    const fields = (({ hostMaster, refresh, retry, expire, ttl, records }) => ({
      hostMaster,
      refresh,
      retry,
      expire,
      ttl,
      records
    }))(zone)

    return this.axios.post('/domains/' + ((domain as IDomain).domainName || domain) + '/zone/update', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Get the transfer status for a domain.
   * @link https://dm.realtimeregister.com/docs/api/domains/transferinfo
   * @param domain - Domain name.
   * @param processId - ID of the transfer process.
   * @param fields - Fields to include in the response.
   */
  async getTransferInfo (domain: string, processId: number, fields?: string[]): Promise<TransferInfo> {
    return this.axios.get('/domains/' + domain + '/transfer/' + processId, { params: { fields } })
      .then(response => new TransferInfo(response.data))
  }
}
