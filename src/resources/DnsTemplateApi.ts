import Base from '@/resources/Base.ts'
import { DNSTemplateListParams } from '@/models/ListParams.ts'
import Page from '@/models/Page.ts'
import { CancelToken } from 'axios'
import DNSTemplate, { DNSTemplateField, IDNSTemplate, IDNSTemplateCreate, IDNSTemplateUpdate } from '@/models/DNSTemplate.ts'
import { ProcessResponse } from '@/models/ProcessResponse.ts'

export default class DnsTemplateApi extends Base {
  async get (dnsTemplate: IDNSTemplate | string, fields?: DNSTemplateField[]): Promise<DNSTemplate> {
    return this.axios.get('/customers/' + this.customer + '/dnstemplates/' + ((dnsTemplate as IDNSTemplate).name || dnsTemplate), { params: { fields } })
      .then(response => new DNSTemplate(response.data))
  }

  async list (params?: DNSTemplateListParams, cancelToken?: CancelToken): Promise<Page<DNSTemplate>> {
    return this.axios.get('/customers/' + this.customer + '/dnstemplates/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: DNSTemplate[] = (response.data.entities || []).map((data: IDNSTemplate) => new DNSTemplate(data))
        return new Page<DNSTemplate>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async create (template: IDNSTemplateCreate): Promise<ProcessResponse> {
    const fields = (({ hostMaster, refresh, retry, expire, ttl, records }) => ({ hostMaster, refresh, retry, expire, ttl, records }))(template)

    return this.axios.post('/customers/' + this.customer + '/dnstemplates/' + template.name, fields)
      .then(response => new ProcessResponse(response))
  }

  async update (template: IDNSTemplateUpdate): Promise<ProcessResponse> {
    const fields = (({ hostMaster, refresh, retry, expire, ttl, records }) => ({ hostMaster, refresh, retry, expire, ttl, records }))(template)

    return this.axios.post('/customers/' + this.customer + '/dnstemplates/' + template.name + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  async delete (dnsTemplate: IDNSTemplate | string): Promise<ProcessResponse> {
    return this.axios.delete('/customers/' + this.customer + '/dnstemplates/' + ((dnsTemplate as IDNSTemplate).name || dnsTemplate))
      .then(response => new ProcessResponse(response))
  }

}
