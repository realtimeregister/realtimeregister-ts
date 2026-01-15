import Base from '@/resources/Base.ts'
import { DNSTemplateListParams } from '@/models/ListParams.ts'
import Page from '@/models/Page.ts'
import { CancelToken } from 'axios'
import DNSTemplate, { DNSTemplateField, IDNSTemplate, IDNSTemplateCreate, IDNSTemplateUpdate } from '@/models/DNSTemplate.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'

export default class DnsTemplateApi extends Base {
  /**
   * Get a DNS template.
   * @link https://dm.realtimeregister.com/docs/api/templates/get
   * @param dnsTemplate - DNS template name, or object.
   * @param fields - fields to include in response.
   */
  async get (dnsTemplate: IDNSTemplate | string, fields?: DNSTemplateField[]): Promise<DNSTemplate> {
    return this.axios.get('/customers/' + this.customer + '/dnstemplates/' + ((dnsTemplate as IDNSTemplate).name || dnsTemplate), { params: { fields } })
      .then(response => new DNSTemplate(response.data))
  }

  /**
   * List DNS templates based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/templates/list
   * @see DNSTemplateListParams
   * @param params - object containing parameters passed to the listing, see DNSTemplateListParams.
   * @param cancelToken
   */
  async list (params?: DNSTemplateListParams, cancelToken?: CancelToken): Promise<Page<DNSTemplate>> {
    return this.axios.get('/customers/' + this.customer + '/dnstemplates/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: DNSTemplate[] = (response.data.entities || []).map((data: IDNSTemplate) => new DNSTemplate(data))
        return new Page<DNSTemplate>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Create a DNS template.
   * @link https://dm.realtimeregister.com/docs/api/templates/create
   * @param template - Data for the new DNS template.
   */
  async create (template: IDNSTemplateCreate): Promise<ProcessResponse> {
    const fields = (({ hostMaster, refresh, retry, expire, ttl, records }) => ({ hostMaster, refresh, retry, expire, ttl, records }))(template)

    return this.axios.post('/customers/' + this.customer + '/dnstemplates/' + template.name, fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Update an existing DNS template. Will determine the template to update based on the name property.
   * @link https://dm.realtimeregister.com/docs/api/templates/update
   * @param template - Data for the DNS template to update.
   */
  async update (template: IDNSTemplateUpdate): Promise<ProcessResponse> {
    const fields = (({ hostMaster, refresh, retry, expire, ttl, records }) => ({ hostMaster, refresh, retry, expire, ttl, records }))(template)

    return this.axios.post('/customers/' + this.customer + '/dnstemplates/' + template.name + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Delete an existing DNS template.
   * @link https://dm.realtimeregister.com/docs/api/templates/delete
   * @param dnsTemplate - DNS template name, or object.
   */
  async delete (dnsTemplate: IDNSTemplate | string): Promise<ProcessResponse> {
    return this.axios.delete('/customers/' + this.customer + '/dnstemplates/' + ((dnsTemplate as IDNSTemplate).name || dnsTemplate))
      .then(response => new ProcessResponse(response))
  }

}
