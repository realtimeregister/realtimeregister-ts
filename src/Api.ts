import staticAxios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios'

/** Api Resources */
import DomainApi from '@/resources/DomainApi.ts'
import ContactApi from '@/resources/ContactApi.ts'
import DnsZoneApi from '@/resources/DnsZoneApi.ts'
import DnsTemplateApi from '@/resources/DnsTemplateApi.ts'
import HostApi from '@/resources/HostApi.ts'
import SSLApi from '@/resources/SslApi.ts'
import ProcessApi from '@/resources/ProcessApi.ts'
import CustomerApi from '@/resources/CustomerApi.ts'
import BillingApi from '@/resources/BillingApi.ts'
import NotificationsApi from '@/resources/NotificationsApi.ts'
import ProviderApi from '@/resources/ProviderApi.ts'
import SiteLockApi from '@/resources/SiteLockApi.ts'
import BrandApi from '@/resources/BrandApi.ts'
import TldsApi from '@/resources/TldsApi.ts'
import ValidationApi from '@/resources/ValidationApi.ts'
import SslAcmeApi from '@/resources/SslAcmeApi.ts'

import {
  AuthenticationError,
  AuthorizationError,
  BillableAcknowledgmentNeededException,
  ConstraintViolationException,
  ContactUpdateValidationError,
  DnsConfigurationException,
  InsufficientCreditException,
  InternalSRSError,
  InvalidCSRException,
  InvalidMessage,
  NoContractException,
  NotFound,
  ObjectDoesNotExist,
  ObjectExists,
  ObjectStatusProhibitsOperation,
  ProcessError,
  ProviderConnectionError,
  ProviderUnavailable,
  TooManyRequests,
  UnrecognizedPropertyException,
  ValidationError
} from '@/Exceptions.ts'

import qs from 'qs'

export interface ApiConfiguration {
  apiKey: string,
  axiosConfig?: AxiosRequestConfig,
  baseURL?: string,
  customer: string,
  ote?: boolean,
}

export interface IRealtimeRegisterAPI {
  axios: AxiosInstance
  billing: BillingApi
  brand: BrandApi
  contacts: ContactApi
  customer: CustomerApi
  dnsTemplate: DnsTemplateApi
  dnsZone: DnsZoneApi
  domains: DomainApi
  hosts: HostApi
  notification: NotificationsApi
  process: ProcessApi
  provider: ProviderApi
  siteLock: SiteLockApi
  ssl: SSLApi
  sslAcme: SslAcmeApi
  tld: TldsApi
  validation: ValidationApi
}

export default class RealtimeRegisterAPI implements IRealtimeRegisterAPI {
  axios: AxiosInstance
  billing: BillingApi
  brand: BrandApi
  contacts: ContactApi
  customer: CustomerApi
  dnsTemplate: DnsTemplateApi
  dnsZone: DnsZoneApi
  domains: DomainApi
  hosts: HostApi
  notification: NotificationsApi
  process: ProcessApi
  provider: ProviderApi
  siteLock: SiteLockApi
  ssl: SSLApi
  sslAcme: SslAcmeApi
  tld: TldsApi
  validation: ValidationApi


  constructor(config: ApiConfiguration) {
    const axiosConfiguration: AxiosRequestConfig = {
      ...config.axiosConfig,
      headers: {
        ...config.axiosConfig?.headers,
        Authorization: !config.axiosConfig?.headers?.Authorization
          ? `ApiKey ${config.apiKey}`
          : config.axiosConfig.headers.Authorization
      },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
    }

    if (config.baseURL) {
      axiosConfiguration.baseURL = config.baseURL
    } else if (config.ote) {
      axiosConfiguration.baseURL = 'https://api.yoursrs-ote.com/v2/'
    } else {
      axiosConfiguration.baseURL = 'https://api.yoursrs.com/v2/'
    }

    this.axios = staticAxios.create(axiosConfiguration)
    this.axios.interceptors.response.use(undefined, this.errorHandler)

    this.billing = new BillingApi(this.axios, config.customer)
    this.brand = new BrandApi(this.axios, config.customer)
    this.contacts = new ContactApi(this.axios, config.customer)
    this.customer = new CustomerApi(this.axios, config.customer)
    this.dnsTemplate = new DnsTemplateApi(this.axios, config.customer)
    this.dnsZone = new DnsZoneApi(this.axios, config.customer)
    this.domains = new DomainApi(this.axios, config.customer)
    this.hosts = new HostApi(this.axios, config.customer)
    this.process = new ProcessApi(this.axios, config.customer)
    this.provider = new ProviderApi(this.axios, config.customer)
    this.siteLock = new SiteLockApi(this.axios, config.customer)
    this.ssl = new SSLApi(this.axios, config.customer)
    this.sslAcme = new SslAcmeApi(this.axios, config.customer)
    this.notification = new NotificationsApi(this.axios, config.customer)
    this.tld = new TldsApi(this.axios, config.customer)
    this.validation = new ValidationApi(this.axios, config.customer)
  }

  cancelSource(): CancelTokenSource {
    return staticAxios.CancelToken.source()
  }

  private errorHandler (error: any): Promise<any> {
    if (!error.response && staticAxios.isCancel(error)) {
      return Promise.reject(error)
    }

    if (error.response) {
      switch (error.response.status) {
        case 401:
          return Promise.reject(new AuthenticationError(error.response, error.message))
        case 403:
          return Promise.reject(new AuthorizationError(error.response, error.message))
        case 404:
          return Promise.reject(new NotFound(error.response, error.message))
        case 429:
          return Promise.reject(new TooManyRequests(error.response, 'Too many requests'))
      }

      if (error.response.data && error.response.data.type) {
        switch (error.response.data.type) {
          case 'AuthenticationError':
            return Promise.reject(new AuthenticationError(error.response, error.message))
          case 'ValidationError':
            return Promise.reject(new ValidationError(error.response))
          case 'ConstraintViolationException':
            return Promise.reject(new ConstraintViolationException(error.response))
          case 'InsufficientCreditException':
            return Promise.reject(new InsufficientCreditException(error.response))
          case 'InternalSRSError':
            return Promise.reject(new InternalSRSError(error.response))
          case 'NoContractException':
            return Promise.reject(new NoContractException(error.response))
          case 'ObjectDoesNotExist':
            return Promise.reject(new ObjectDoesNotExist(error.response))
          case 'ObjectExists':
            return Promise.reject(new ObjectExists(error.response))
          case 'ProcessError':
            return Promise.reject(new ProcessError(error.response))
          case 'ProviderConnectionError':
            return Promise.reject(new ProviderConnectionError(error.response))
          case 'ProviderUnavailable':
            return Promise.reject(new ProviderUnavailable(error.response))
          case 'UnrecognizedPropertyException':
            return Promise.reject(new UnrecognizedPropertyException(error.response))
          case 'ObjectStatusProhibitsOperation':
            return Promise.reject(new ObjectStatusProhibitsOperation(error.response))
          case 'BillableAcknowledgmentNeededException':
            return Promise.reject(new BillableAcknowledgmentNeededException(error.response))
          case 'ContactUpdateValidationError':
            return Promise.reject(new ContactUpdateValidationError(error.response))
          case 'DnsConfigurationException':
            return Promise.reject(new DnsConfigurationException(error.response))
          case 'InvalidCSRException':
            return Promise.reject(new InvalidCSRException(error.response))
          case 'InvalidMessage':
            return Promise.reject(new InvalidMessage(error.response))
          case 'UnsupportedTld':
            return Promise.reject(new InvalidMessage(error.response))
        }
      }
    }

    return Promise.reject(error)
  }
}