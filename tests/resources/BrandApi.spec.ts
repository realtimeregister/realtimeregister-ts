import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import BrandApi from '@/resources/BrandApi.ts'
import AxiosMockAdapter from 'axios-mock-adapter'
import { createAxios } from '../utils.ts'
import Brand, { BrandField, IBrand, Locale } from '@/models/Brand.ts'
import BrandTemplate, { BrandTemplateResponse, IBrandTemplate, BrandTemplateField } from '@/models/BrandTemplate.ts'
import Page, { IPage } from '@/models/Page.ts'
import { BrandListParams, BrandTemplateListParams } from '@/models/ListParams.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'

describe('BrandApi', () => {
  let brandApi: BrandApi
  let mockAdapter: AxiosMockAdapter
  const mockAxios = createAxios()

  beforeEach(() => {
    brandApi = new BrandApi(mockAxios, 'test-customer')
    mockAdapter = new AxiosMockAdapter(mockAxios)
  })

  afterEach(() => {
    mockAdapter.restore()
  })


  describe('constructor', () => {

    it('Should create instance with correct properties', () => {
      expect(brandApi).toBeInstanceOf(BrandApi)
      expect(brandApi.axios).toBe(mockAxios)
      expect(brandApi.customer).toBe('test-customer')
    })

    it('Should create instance without customer', () => {
      const api = new BrandApi(mockAxios)
      expect(api.customer).toBeUndefined()
    })

  })

  describe('get', () => {
    const mockBrandData: IBrand = {
      handle: 'default',
      email: 'admin@example.com',
      city: 'Zwolle',
      country: 'NL',
      organization: '',
      addressLine: [
        'Somewhere in Zwolle'
      ],
      voice: '+3112345678',
      postalCode: '1234AB',
      locale: Locale['en-US'],
      createdDate: new Date(),
      hideOptionalTerms: true
    }

    it ('Should get brand by handle', async () => {
      mockAdapter.onGet('/customers/test-customer/brands/default').reply(200, mockBrandData)

      const result = await brandApi.get('default')
      expect(result).toBeInstanceOf(Brand)
      expect(result.handle).toBe('default')
      expect(result.email).toBe('admin@example.com')
      expect(result.postalCode).toBe('1234AB')
    })

    it('Should get brand by brand object', async () => {
      mockAdapter.onGet('/customers/test-customer/brands/default').reply(200, mockBrandData)

      const result = await brandApi.get(mockBrandData)
      expect(result).toBeInstanceOf(Brand)
      expect(result.handle).toBe('default')
      expect(result.postalCode).toBe('1234AB')
      expect(result.email).toBe('admin@example.com')
    })

    it('Should get brand with specific fields', async () => {
      const requestedFields: BrandField[] = ['handle', 'email']

      mockAdapter.onGet('/customers/test-customer/brands/default').reply(config => {
        expect(config.params.fields).toEqual(requestedFields)
        return [200, mockBrandData]
      })

      const result = await brandApi.get('default', requestedFields)
      expect(result).toBeInstanceOf(Brand)
    })

  })

  describe('list', () => {
    const mockedBrandsList: IPage<IBrand> = {
      entities: [
        {
          handle: 'default',
          email: 'admin@example.com',
          city: 'Zwolle',
          country: 'NL',
          organization: '',
          addressLine: [
            'Somewhere in Zwolle'
          ],
          voice: '+3112345678',
          postalCode: '1234AB',
          locale: Locale['en-US'],
          createdDate: new Date(),
          hideOptionalTerms: true
        },
        {
          handle: 'dutch',
          email: 'admin@example.com',
          city: 'Zwolle',
          country: 'NL',
          organization: '',
          addressLine: [
            'Somewhere in Zwolle'
          ],
          voice: '+3112345678',
          postalCode: '1234AB',
          locale: Locale['nl-NL'],
          createdDate: new Date(),
          hideOptionalTerms: true
        }
      ],
      pagination: {
        limit: 10,
        offset: 0,
        total: 2
      }
    }

    it('Should get brands list without parameters', async () => {
      mockAdapter.onGet('/customers/test-customer/brands/').reply(200, mockedBrandsList)

      const result = await brandApi.list()
      expect(result).toBeInstanceOf(Page)
      expect(result.entities).toHaveLength(2)
      expect(result.entities[0]).toBeInstanceOf(Brand)
      expect(result.entities[0].handle).toBe('default')
      expect(result.entities[1]).toBeInstanceOf(Brand)
      expect(result.entities[1].handle).toBe('dutch')
    })

    it('Should get brands list with parameters', async () => {
      const params: BrandListParams = {
        limit: 5,
        offset: 10,
        order: ['-createdDate'],
        filters: [
          { field: 'handle', matcher: 'eq', value: 'default' }
        ]
      }

      vi.spyOn(brandApi, 'listParamsToUrlParams').mockReturnValue({
        limit: 5,
        offset: 10,
        order: ['-createdDate'],
        handle: 'default'
      })

      mockAdapter.onGet('/customers/test-customer/brands/').reply(config => {
        expect(config.params.handle).toBe('default')
        expect(config.params.order).toEqual(['-createdDate'])
        return [200, mockedBrandsList]
      })

      const result = await brandApi.list(params)
      expect(result).toBeInstanceOf(Page)
      expect(brandApi.listParamsToUrlParams).toHaveBeenCalledWith(params)

    })

    it('Should handle empty brands list', async () => {
      const emptyList = {
        entities: [],
        pagination: { limit: 10, offset: 0, total: 0 }
      }

      mockAdapter.onGet('/customers/test-customer/brands/').reply(200, emptyList)

      const result = await brandApi.list()

      expect(result.entities).toHaveLength(0)
      expect(result.pagination.total).toBe(0)
    })

  })

  describe('create', () => {
    const newBrandData: IBrand = {
      handle: 'new-brand',
      hideOptionalTerms: false,
      organization: 'New Organization',
      addressLine: ['789 New St'],
      postalCode: '99999',
      city: 'New City',
      country: 'NL',
      email: 'new@example.com',
      voice: '+3112345678',
      createdDate: new Date()
    }

    it('Should create new brand', async () => {
      mockAdapter.onPost('/customers/test-customer/brands/new-brand').reply(config => {
        const data = JSON.parse(config.data)
        // Handle shouldn't be provided in the request body.
        expect(data.handle).toBeUndefined()
        expect(data.hideOptionalTerms).toBe(newBrandData.hideOptionalTerms)
        expect(data.organization).toBe(newBrandData.organization)
        expect(data.addressLine).toEqual(newBrandData.addressLine)
        return [200, {}, { 'x-process-id': '12345' }]
      })

      const result = await brandApi.create(newBrandData)
      expect(result).toBeInstanceOf(ProcessResponse)
      expect(result.id).toBe(12345)
    })


  })

  describe('update', () => {
    const updateData: IBrand = {
      handle: 'update-brand',
      hideOptionalTerms: true,
      organization: 'Updated Organization',
      addressLine: ['456 Updated St'],
      postalCode: '55555',
      city: 'Updated City',
      country: 'CA',
      email: 'updated@example.com',
      voice: '+1-555-555-5555',
      createdDate: new Date()
    }

    it('Should update a brand', async () => {
      mockAdapter.onPost('/customers/test-customer/brands/update-brand/update').reply(200, {}, {
        'x-process-id': '125'
      })

      const result = await brandApi.update(updateData)

      expect(result).toBeInstanceOf(ProcessResponse)
      expect(result.id).toBe(125)
      expect(result.status).toBe(200)

      const requestData = JSON.parse(mockAdapter.history.post[0].data)
      expect(requestData).toHaveProperty('organization', 'Updated Organization')
      expect(requestData).toHaveProperty('hideOptionalTerms', true)
    })
  })

  describe('delete', () => {
    it('Should delete brand by handle string', async () => {
      mockAdapter.onDelete('/customers/test-customer/brands/delete-brand').reply(204, {}, {
        'x-process-id': '126'
      })

      const result = await brandApi.delete('delete-brand')

      expect(result).toBeInstanceOf(ProcessResponse)
      expect(result.id).toBe(126)
      expect(result.status).toBe(204)
    })

    it('Should delete brand by brand object', async () => {
      const brandObj = { handle: 'delete-brand' } as IBrand
      mockAdapter.onDelete('/customers/test-customer/brands/delete-brand').reply(204, {}, {
        'x-process-id': '127'
      })

      const result = await brandApi.delete(brandObj)

      expect(result).toBeInstanceOf(ProcessResponse)
      expect(result.id).toBe(127)
    })
  })

  describe('getTemplate', () => {
    const mockTemplateData: BrandTemplateResponse = {
      name: 'test-template',
      subject: 'Test Subject',
      text: 'Test text content',
      html: '<h1>Test HTML</h1>',
      contexts: ['base', 'domain'],
      media: {
        'logo.png': {
          name: 'logo.png',
          mimetype: 'image/png',
          size: 1024,
          url: 'https://example.com/logo.png'
        }
      }
    }

    it('Should get template by name string', async () => {
      mockAdapter.onGet('/customers/test-customer/brands/test-brand/templates/test-template')
        .reply(200, mockTemplateData)

      const result = await brandApi.getTemplate('test-brand', 'test-template')

      expect(result).toBeInstanceOf(BrandTemplate)
      expect(result.name).toBe('test-template')
      expect(result.subject).toBe('Test Subject')
    })

    it('Should get template with brand and template objects', async () => {
      const brandObj = { handle: 'test-brand' } as IBrand
      const templateObj = { name: 'test-template' } as IBrandTemplate

      mockAdapter.onGet('/customers/test-customer/brands/test-brand/templates/test-template')
        .reply(200, mockTemplateData)

      const result = await brandApi.getTemplate(brandObj, templateObj)

      expect(result).toBeInstanceOf(BrandTemplate)
      expect(result.name).toBe('test-template')
    })

    it('Should get template with specific fields', async () => {
      const fields: BrandTemplateField[] = ['name', 'subject', 'html']

      mockAdapter.onGet('/customers/test-customer/brands/test-brand/templates/test-template')
        .reply(config => {
          expect(config.params.fields).toEqual(fields)
          return [200, mockTemplateData]
        })

      const result = await brandApi.getTemplate('test-brand', 'test-template', fields)

      expect(result).toBeInstanceOf(BrandTemplate)
      expect(mockAdapter.history.get[0].params.fields).toEqual(fields)
    })
  })

  describe('listTemplate', () => {
    const mockTemplatesList = {
      entities: [
        {
          name: 'template-1',
          subject: 'Subject 1',
          contexts: ['base']
        },
        {
          name: 'template-2',
          subject: 'Subject 2',
          contexts: ['domain']
        }
      ],
      pagination: {
        limit: 10,
        offset: 0,
        total: 2
      }
    }

    it('Should list templates without parameters', async () => {
      mockAdapter.onGet('/customers/test-customer/brands/test-brand/templates/')
        .reply(200, mockTemplatesList)

      const result = await brandApi.listTemplate('test-brand')

      expect(result).toBeInstanceOf(Page)
      expect(result.entities).toHaveLength(2)
      expect(result.entities[0]).toBeInstanceOf(BrandTemplate)
      expect(result.entities[0].name).toBe('template-1')
    })

    it('Should list templates with parameters', async () => {
      const params: BrandTemplateListParams = {
        limit: 5,
        filters: [{ field: 'name', matcher: 'eq', value: 'test' }]
      }

      vi.spyOn(brandApi, 'listParamsToUrlParams').mockReturnValue({ limit: 5, name: 'test' })

      mockAdapter.onGet('/customers/test-customer/brands/test-brand/templates/')
        .reply(200, mockTemplatesList)

      const result = await brandApi.listTemplate('test-brand', params)

      expect(result).toBeInstanceOf(Page)
      expect(brandApi.listParamsToUrlParams).toHaveBeenCalledWith(params)
    })
  })

  describe('updateTemplate', () => {
    const templateData: IBrandTemplate = {
      name: 'update-template',
      subject: 'Updated Subject',
      text: 'Updated text',
      html: '<h1>Updated HTML</h1>',
      contexts: ['base']
    }

    it('Should update template without images', async () => {
      mockAdapter.onPost('/customers/test-customer/brands/test-brand/templates/update-template/update')
        .reply(200, {}, { 'x-process-id': '128' })

      const result = await brandApi.updateTemplate('test-brand', templateData)

      expect(result).toBeInstanceOf(ProcessResponse)
      expect(result.id).toBe(128)

      const requestData = JSON.parse(mockAdapter.history.post[0].data)
      expect(requestData).toHaveProperty('subject', 'Updated Subject')
      expect(requestData).toHaveProperty('text', 'Updated text')
      expect(requestData).toHaveProperty('html', '<h1>Updated HTML</h1>')
      expect(requestData).not.toHaveProperty('name') // should be filtered out
      expect(requestData).not.toHaveProperty('contexts') // should be filtered out
    })

    it('Should update template with images', async () => {
      const mockFile = new File(['test content'], 'test-image.png', { type: 'image/png' })
      const images = [mockFile]

      mockAdapter.onPost('/customers/test-customer/brands/test-brand/templates/update-template/update')
        .reply(200, {}, { 'x-process-id': '129' })

      const result = await brandApi.updateTemplate('test-brand', templateData, images)

      expect(result).toBeInstanceOf(ProcessResponse)
      expect(result.id).toBe(129)

      // Verify FormData was sent
      expect(mockAdapter.history.post[0].data).toBeInstanceOf(FormData)
    })

    it('Should handle empty images array', async () => {
      const images: File[] = []

      mockAdapter.onPost('/customers/test-customer/brands/test-brand/templates/update-template/update')
        .reply(200, {}, { 'x-process-id': '130' })

      const result = await brandApi.updateTemplate('test-brand', templateData, images)

      expect(result).toBeInstanceOf(ProcessResponse)
      expect(mockAdapter.history.post[0].data).toBeInstanceOf(FormData)
    })

    it('Should sanitize file names', async () => {
      const mockFile = new File(['test'], 'test image with spaces & symbols!@#$%.png', { type: 'image/png' })
      const images = [mockFile]

      mockAdapter.onPost('/customers/test-customer/brands/test-brand/templates/update-template/update')
        .reply(200, {}, { 'x-process-id': '131' })

      await brandApi.updateTemplate('test-brand', templateData, images)

      expect(mockAdapter.history.post[0].data).toBeInstanceOf(FormData)
    })
  })

  describe('previewTemplate', () => {
    const mockPreviewData: BrandTemplateResponse = {
      name: 'preview-template',
      subject: 'Preview Subject',
      text: 'Preview text',
      html: '<h1>Preview HTML</h1>',
      contexts: ['base']
    }

    it('Should preview template with default context', async () => {
      mockAdapter.onGet('/customers/test-customer/brands/test-brand/templates/preview-template/preview')
        .reply(config => {
          expect(config.params.context).toBe('base')
          return [200, mockPreviewData]
        })

      const templateObj = { name: 'preview-template' } as IBrandTemplate
      const result = await brandApi.previewTemplate('test-brand', templateObj)

      expect(result).toBeInstanceOf(BrandTemplate)
      expect(result.name).toBe('preview-template')
    })

    it('Should preview template with custom context', async () => {
      mockAdapter.onGet('/customers/test-customer/brands/test-brand/templates/preview-template/preview')
        .reply(config => {
          expect(config.params.context).toBe('domain')
          return [200, mockPreviewData]
        })

      const templateObj = { name: 'preview-template' } as IBrandTemplate
      const result = await brandApi.previewTemplate('test-brand', templateObj, 'domain')

      expect(result).toBeInstanceOf(BrandTemplate)
    })
  })


})


