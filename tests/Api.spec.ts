import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import AxiosMockAdapter from 'axios-mock-adapter'

import RealtimeRegisterAPI, {
  type ApiConfiguration,
  DomainApi,
  BillingApi,
  BrandApi,
  ContactApi,
  CustomerApi,
  DnsTemplateApi,
  DnsZoneApi,
  HostApi,
  ProcessApi,
  ProviderApi,
  SiteLockApi,
  SSLApi,
  NotificationsApi, TldsApi, IQuote
} from '@/index.ts'

import {
  AuthenticationError,
  AuthorizationError,
  NotFound,
  TooManyRequests,
  ValidationError,
  ConstraintViolationException,
  InsufficientCreditException,
  InternalSRSError,
  NoContractException,
  ObjectDoesNotExist,
  ObjectExists,
  ProcessError,
  ProviderConnectionError,
  ProviderUnavailable,
  UnrecognizedPropertyException,
  ObjectStatusProhibitsOperation,
  BillableAcknowledgmentNeededException,
  ContactUpdateValidationError,
  DnsConfigurationException,
  InvalidCSRException,
  InvalidMessage
} from '@/Exceptions'


const mockConfiguration: ApiConfiguration = {
  apiKey: 'test-key',
  customer: 'test-customer',
  ote: true
}

type IConstraintViolation = {
  field: string,
  message: string,
  value?: string
}

describe('RealtimeRegisterAPI', () => {

  it('Should create instance with right properties', () => {
    const api: RealtimeRegisterAPI = new RealtimeRegisterAPI(mockConfiguration)
    expect(api).toBeInstanceOf(RealtimeRegisterAPI)
    expect(api.axios).toBeTruthy()
    expect(api.billing).toBeInstanceOf(BillingApi)
    expect(api.brand).toBeInstanceOf(BrandApi)
    expect(api.contacts).toBeInstanceOf(ContactApi)
    expect(api.customer).toBeInstanceOf(CustomerApi)
    expect(api.dnsTemplate).toBeInstanceOf(DnsTemplateApi)
    expect(api.dnsZone).toBeInstanceOf(DnsZoneApi)
    expect(api.domains).toBeInstanceOf(DomainApi)
    expect(api.hosts).toBeInstanceOf(HostApi)
    expect(api.process).toBeInstanceOf(ProcessApi)
    expect(api.provider).toBeInstanceOf(ProviderApi)
    expect(api.siteLock).toBeInstanceOf(SiteLockApi)
    expect(api.ssl).toBeInstanceOf(SSLApi)
    expect(api.notification).toBeInstanceOf(NotificationsApi)
    expect(api.tld).toBeInstanceOf(TldsApi)
  })

  it('Should set proper url in OT&E mode', () => {
    const api = new RealtimeRegisterAPI(mockConfiguration)
    expect(api.axios.defaults.baseURL).toBe('https://api.yoursrs-ote.com/v2/')
  })

  it('Should set proper url in production mode', () => {
    const api = new RealtimeRegisterAPI({ ...mockConfiguration, ote: false })
    expect(api.axios.defaults.baseURL).toBe('https://api.yoursrs.com/v2/')
  })

  it('Should properly set configuration', () => {
    const config: ApiConfiguration = {
      apiKey: 'test-key',
      customer: 'test-customer',
      ote: true,
      baseURL: 'https://example.com',
      axiosConfig: {
        headers: {
          Authorization: 'Bearer test-token'
        }
      }
    }

    const api = new RealtimeRegisterAPI(config)
    expect(api.axios.defaults.baseURL).toBe('https://example.com')
    expect(api.axios.defaults.headers.Authorization).toBe('Bearer test-token')
  })

  describe('Error handling', () => {
    let api: RealtimeRegisterAPI
    let mockAdapter: AxiosMockAdapter

    beforeEach(() => {
      api = new RealtimeRegisterAPI(mockConfiguration)
      // AxiosMockAdapter based on axios instance within the api instance to intercept/mock requests.
      mockAdapter = new AxiosMockAdapter(api.axios)
    })

    afterEach(() => {
      mockAdapter.restore()
    })

    /**
     * Create a mock reply for the /test endpoint with the given status code.
     * @param status
     * @param data data to be returned in the response.
     */
    function createTestEPMockReply(status: number, data?: {
      type?: string, violations?: IConstraintViolation[], message?: string, quote?: IQuote
    }) {
      mockAdapter.onGet('/test').reply(status, data)
    }

    /**
     * Expect an error to be thrown on the test endpoint with the given error instance.
     * @param error
     */
    async function expectErrorOnTestResponse(error: any) {
      await expect(api.axios.get('/test')).rejects.toThrow(error)
    }

    it('Should throw AuthenticationError on 401', async () => {
      createTestEPMockReply(401)
      await expectErrorOnTestResponse(AuthenticationError)
    })

    it('Should throw AuthorizationError on 403', async () => {
      createTestEPMockReply(403)
      await expectErrorOnTestResponse(AuthorizationError)
    })

    it('Should throw NotFound on 404', async () => {
      createTestEPMockReply(404)
      await expectErrorOnTestResponse(NotFound)
    })

    it('Should throw TooManyRequests on 429', async () => {
      createTestEPMockReply(429)
      await expectErrorOnTestResponse(TooManyRequests)
    })

    it('Should throw ValidationError when type is ValidationError', async () => {
      createTestEPMockReply(400, { type: 'ValidationError' })
      await expectErrorOnTestResponse(ValidationError)
    })

    it('Should throw ConstraintViolationException when type is ConstraintViolationException', async () => {
      createTestEPMockReply(400, { type: 'ConstraintViolationException', violations: [] })
      await expectErrorOnTestResponse(ConstraintViolationException)
    })

    it('Should throw InsufficientCreditException when type is InsufficientCreditException', async () => {
      createTestEPMockReply(400, { type: 'InsufficientCreditException' })
      await expectErrorOnTestResponse(InsufficientCreditException)
    })

    it('Should throw InternalSRSError when type is InternalSRSError', async () => {
      createTestEPMockReply(400, { type: 'InternalSRSError' })
      await expectErrorOnTestResponse(InternalSRSError)
    })

    it('Should throw NoContractException when type is NoContractException', async () => {
      createTestEPMockReply(400, { type: 'NoContractException' })
      await expectErrorOnTestResponse(NoContractException)
    })

    it('Should throw ObjectDoesNotExist when type is ObjectDoesNotExist', async () => {
      createTestEPMockReply(400, { type: 'ObjectDoesNotExist' })
      await expectErrorOnTestResponse(ObjectDoesNotExist)
    })

    it('Should throw ObjectExists when type is ObjectExists', async () => {
      createTestEPMockReply(400, { type: 'ObjectExists' })
      await expectErrorOnTestResponse(ObjectExists)
    })

    it('Should throw ProcessError when type is ProcessError', async () => {
      createTestEPMockReply(400, { type: 'ProcessError' })
      await expectErrorOnTestResponse(ProcessError)
    })

    it('Should throw ProviderConnectionError when type is ProviderConnectionError', async () => {
      createTestEPMockReply(400, { type: 'ProviderConnectionError' })
      await expectErrorOnTestResponse(ProviderConnectionError)
    })

    it('Should throw ProviderUnavailable when type is ProviderUnavailable', async () => {
      createTestEPMockReply(400, { type: 'ProviderUnavailable' })
      await expectErrorOnTestResponse(ProviderUnavailable)
    })

    it('Should throw UnrecognizedPropertyException when type is UnrecognizedPropertyException', async () => {
      createTestEPMockReply(400, { type: 'UnrecognizedPropertyException' })
      await expectErrorOnTestResponse(UnrecognizedPropertyException)
    })

    it('Should throw ObjectStatusProhibitsOperation when type is ObjectStatusProhibitsOperation', async () => {
      createTestEPMockReply(400, { type: 'ObjectStatusProhibitsOperation' })
      await expectErrorOnTestResponse(ObjectStatusProhibitsOperation)
    })

    it('Should throw BillableAcknowledgmentNeededException when type is BillableAcknowledgmentNeededException', async () => {
      createTestEPMockReply(400, { type: 'BillableAcknowledgmentNeededException', quote: { total: 0 } })
      await expectErrorOnTestResponse(BillableAcknowledgmentNeededException)
    })

    it('Should throw ContactUpdateValidationError when type is ContactUpdateValidationError', async () => {
      createTestEPMockReply(400, { type: 'ContactUpdateValidationError' })
      await expectErrorOnTestResponse(ContactUpdateValidationError)
    })

    it('Should throw DnsConfigurationException when type is DnsConfigurationException', async () => {
      createTestEPMockReply(400, { type: 'DnsConfigurationException' })
      await expectErrorOnTestResponse(DnsConfigurationException)
    })

    it('Should throw InvalidCSRException when type is InvalidCSRException', async () => {
      createTestEPMockReply(400, { type: 'InvalidCSRException' })
      await expectErrorOnTestResponse(InvalidCSRException)
    })

    it('Should throw InvalidMessage when type is InvalidMessage', async () => {
      createTestEPMockReply(400, { type: 'InvalidMessage' })
      await expectErrorOnTestResponse(InvalidMessage)
    })

    it('Should throw InvalidMessage when type is UnsupportedTld', async () => {
      createTestEPMockReply(400, { type: 'UnsupportedTld' })
      await expectErrorOnTestResponse(InvalidMessage)
    })


  })


})
