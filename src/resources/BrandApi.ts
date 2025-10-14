import Base from '@/resources/Base.ts'
import Brand, { BrandField, IBrand, ILocale, Locale } from '@/models/Brand.ts'
import Page from '@/models/Page.ts'
import { BrandListParams, BrandTemplateListParams } from '@/models/ListParams.ts'
import type { AxiosResponse, CancelToken } from 'axios'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'
import BrandTemplate, {
  BrandTemplateField,
  BrandTemplateResponse,
  IBrandTemplate,
} from '@/models/BrandTemplate.ts'

export default class BrandApi extends Base {
  /**
   * Get a brand.
   * @param brand - brand object, or handle.
   * @param fields - fields to include in the response.
   */
  async get (brand: IBrand | string, fields?: BrandField[]): Promise<Brand> {
    return this.axios.get('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand), { params: { fields } })
      .then(response => new Brand(response.data))
  }

  /**
   * Request a list of brands.
   * @param params - object containing parameters passed to the listing, see BrandListParams.
   * @param cancelToken
   */
  async list (params?: BrandListParams, cancelToken?: CancelToken): Promise<Page<Brand>> {
    return this.axios.get('/customers/' + this.customer + '/brands/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Brand[] = (response.data.entities || []).map((data: IBrand) => new Brand(data))
        return new Page<Brand>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Start a process to create a brand.
   * @param brand - object with brand data.
   */
  async create (brand: IBrand): Promise<ProcessResponse> {
    const fields = (({ locale, hideOptionalTerms, organization, addressLine, postalCode, city, state, country, email, contactUrl, url, voice, fax, privacyContact, abuseContact }) => ({ locale, hideOptionalTerms, organization, addressLine, postalCode, city, state, country, email, contactUrl, url, voice, fax, privacyContact, abuseContact }))(brand)

    return this.axios.post('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand), fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Start a process to update a brand.
   * @param brand - object with data to update, brand to update is determined by its handle.
   */
  async update (brand: IBrand): Promise<ProcessResponse> {
    const fields = (({ locale, hideOptionalTerms, organization, addressLine, postalCode, city, state, country, email, contactUrl, url, voice, fax, privacyContact, abuseContact }) => ({ locale, hideOptionalTerms, organization, addressLine, postalCode, city, state, country, email, contactUrl, url, voice, fax, privacyContact, abuseContact }))(brand)

    return this.axios.post('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand) + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Start a process to delete a brand.
   * @param brand - brand object, or handle of the brand.
   */
  async delete (brand: IBrand | string): Promise<ProcessResponse> {
    return this.axios.delete('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand))
      .then(response => new ProcessResponse(response))
  }

  /**
   * Get a template for a brand.
   * @param brand - brand object, or brand handle.
   * @param brandTemplate - template object, or template name.
   * @param fields - fields to include in the response.
   */
  async getTemplate (brand: IBrand | string, brandTemplate: IBrandTemplate | string, fields?: BrandTemplateField[]): Promise<BrandTemplate> {
    return this.axios.get('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand) + '/templates/' + ((brandTemplate as IBrandTemplate).name || brandTemplate), { params: { fields } })
      .then((response: AxiosResponse<BrandTemplateResponse>) => new BrandTemplate(response.data))
  }

  /**
   * Get a list of templates from a specific brand.
   * @param brand - brand object, or brand handle.
   * @param params -
   * @param cancelToken
   */
  async listTemplate (brand: IBrand | string, params?: BrandTemplateListParams, cancelToken?: CancelToken): Promise<Page<BrandTemplate>> {
    return this.axios.get('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand) + '/templates/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response: AxiosResponse<Page<BrandTemplateResponse>>) => {
        const entities: BrandTemplate[] = (response.data.entities || []).map(data => new BrandTemplate(data))
        return new Page<BrandTemplate>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Start a process to update a template.
   * @param brand - brand object, or brand handle.
   * @param brandTemplate - template object containing updated values, determines which template to update by the name property.
   * @param images - array of image files.
   */
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

  /**
   * Preview a template
   * @param brand - brand object, or brand handle.
   * @param brandTemplate - brand template object, or template name.
   * @param context
   */
  async previewTemplate (brand: IBrand | string, brandTemplate: IBrandTemplate, context = 'base'): Promise<BrandTemplate> {
    return this.axios.get('/customers/' + this.customer + '/brands/' + ((brand as IBrand).handle || brand) + '/templates/' + ((brandTemplate as IBrandTemplate).name || brandTemplate) + '/preview', { params: { context } })
      .then((response: AxiosResponse<BrandTemplateResponse>) => new BrandTemplate(response.data))
  }

  async listLocales(): Promise<Locale[]> {
    return this.axios.get('/brands/locales')
      .then(response => response.data.map((locale: ILocale) => new Locale(locale)))
  }
}
