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
import { AxiosResponse, CancelToken } from 'axios'
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
  async get (domain: IDomain | string, fields?: DomainField[]): Promise<Domain> {
    return this.axios.get('/domains/' + ((domain as IDomain).domainName || domain), { params: { fields } })
      .then(response => new Domain(response.data))
  }

  async list (params?: DomainListParams, cancelToken?: CancelToken): Promise<Page<Domain>> {
    return this.axios.get('/domains/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Domain[] = (response.data.entities || []).map((data: IDomain) => new Domain(data))
        return new Page<Domain>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async delete (domainName: IDomain | string): Promise<ProcessResponse> {
    return this.axios.delete('/domains/' + ((domainName as IDomain).domainName || domainName))
      .then(response => new ProcessResponse(response))
  }

  async check (domain: IDomain | string): Promise<IDomainCheckResponse> {
    return this.axios.get('/domains/' + ((domain as IDomain).domainName || domain + '/check'))
      .then((response: AxiosResponse<IDomainCheckResponse>) => {
        return response.data
      })
  }

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

  async pushTransfer (data: IDomainPushTransfer): Promise<ProcessResponse> {
    const fields = (({ recipient }) => ({ recipient }))(data)
    return this.axios.post('/domains/' + data.domainName + '/transfer/push', fields)
      .then(response => new ProcessResponse(response))
  }

  async renew (data: IDomainRenew, quote?: boolean): Promise<DomainRenewProcessResponse | Quote> {
    const fields = (({ period, billables }) => ({ period, billables }))(data)
    return this.axios.post('/domains/' + data.domainName + '/renew', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new DomainRenewProcessResponse(response))
  }

  async restore (data: IDomainRestore, quote?: boolean): Promise<DomainRestoreProcessResponse | Quote> {
    const fields = (({ reason, billables }) => ({ reason, billables }))(data)
    return this.axios.post('/domains/' + data.domainName + '/restore', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new DomainRestoreProcessResponse(response))
  }

  async zoneInfo (domain: IDomain | string, fields?: string[]): Promise<DNSZone> {
    return this.axios.get('/domains/' + ((domain as IDomain).domainName || domain + '/zone'), { params: { fields } })
      .then(response => new DNSZone(response.data))
  }

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

  async getTransferInfo (domain: string, processId: number, fields?: string[]): Promise<TransferInfo> {
    return this.axios.get('/domains/' + domain + '/transfer/' + processId, { params: { fields } })
      .then(response => new TransferInfo(response.data))
  }
}
