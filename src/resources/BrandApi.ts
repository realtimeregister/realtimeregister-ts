import Base from '@/resources/Base'
import Brand, { IBrand } from '@/models/Brand'
import Page from '@/models/Page'
import { BrandListParams, BrandTemplateListParams } from '@/models/ListParams'
import { CancelToken } from 'axios'
import { ProcessResponse } from '@/models/ProcessResponse'
import BrandTemplate, { IBrandTemplate } from '@/models/BrandTemplate'

export default class BrandApi extends Base {
  async get (brand: IBrand | string, fields?: string[]): Promise<Brand> {
    return this.axios.get('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand), { params: { fields } })
      .then(response => new Brand(response.data))
  }

  async list (params?: BrandListParams, cancelToken?: CancelToken): Promise<Page<Brand>> {
    return this.axios.get('/customers/' + this.customer + '/brands/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Brand[] = (response.data.entities || []).map((data: IBrand) => new Brand(data))
        return new Page<Brand>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async create (brand: IBrand): Promise<ProcessResponse> {
    const fields = (({ locale, hideOptionalTerms, organization, addressLine, postalCode, city, state, country, email, url, voice, fax, privacyContact, abuseContact }) => ({ locale, hideOptionalTerms, organization, addressLine, postalCode, city, state, country, email, url, voice, fax, privacyContact, abuseContact }))(brand)

    return this.axios.post('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand), fields)
      .then(response => new ProcessResponse(response))
  }

  async update (brand: IBrand): Promise<ProcessResponse> {
    const fields = (({ locale, hideOptionalTerms, organization, addressLine, postalCode, city, state, country, email, url, voice, fax, privacyContact, abuseContact }) => ({ locale, hideOptionalTerms, organization, addressLine, postalCode, city, state, country, email, url, voice, fax, privacyContact, abuseContact }))(brand)

    return this.axios.post('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand) + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  async delete (brand: IBrand | string): Promise<ProcessResponse> {
    return this.axios.delete('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand))
      .then(response => new ProcessResponse(response))
  }

  async getTemplate (brand: IBrand | string, brandTemplate: IBrandTemplate | string, fields?: string[]): Promise<BrandTemplate> {
    return this.axios.get('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand) + '/templates/' + ((brandTemplate as IBrandTemplate).name || brandTemplate), { params: { fields } })
      .then(response => new BrandTemplate(response.data))
  }

  async listTemplate (brand: IBrand | string, params?: BrandTemplateListParams, cancelToken?: CancelToken): Promise<Page<BrandTemplate>> {
    return this.axios.get('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand) + '/templates/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: BrandTemplate[] = (response.data.entities || []).map((data: IBrandTemplate) => new BrandTemplate(data))
        return new Page<BrandTemplate>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async updateTemplate (brand: IBrand | string, brandTemplate: IBrandTemplate, images?: File[]): Promise<ProcessResponse> {
    const fields = (({ subject, text, html }) => ({ subject, text, html }))(brandTemplate)

    let data: Partial<IBrandTemplate> | FormData
    if (images) {
      data = new FormData()
      const command = JSON.stringify(fields)
      data.append('command', new Blob([command], { type: 'application/json' }))
      if (images.length > 0) {
        for (const image of images) {
          const name = image.name.replace(/[^a-zA-Z0-9\-@.]+/g, '_').slice(0, 40)
          data.append(name, image)
        }
      }
    } else {
      data = fields
    }

    return this.axios.post('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand) + '/templates/' + ((brandTemplate as IBrandTemplate).name) + '/update', data)
      .then(response => new ProcessResponse(response))
  }

  async previewTemplate (brand: IBrand | string, brandTemplate: IBrandTemplate, context = 'base'): Promise<BrandTemplate> {
    return this.axios.get('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand) + '/templates/' + ((brandTemplate as IBrandTemplate).name || brandTemplate) + '/preview', { params: { context } })
      .then(response => new BrandTemplate(response.data))
  }

}
