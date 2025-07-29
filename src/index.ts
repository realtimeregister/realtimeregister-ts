import staticAxios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios'
import DomainApi from '@/resources/DomainApi'
import ContactApi from '@/resources/ContactApi'
import DnsZoneApi from '@/resources/DnsZoneApi'
import DnsTemplateApi from '@/resources/DnsTemplateApi'
import HostApi from '@/resources/HostApi'
import SSLApi from '@/resources/SslApi'
import ProcessApi from '@/resources/ProcessApi'
import CustomerApi from '@/resources/CustomerApi'
import BillingApi from '@/resources/BillingApi'
import NotificationsApi from '@/resources/NotificationsApi'
import ProviderApi from '@/resources/ProviderApi'
import SiteLockApi from '@/resources/SiteLockApi'
import BrandApi from '@/resources/BrandApi'
import TldsApi from '@/resources/TldsApi'

import qs from 'qs'

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
} from '@/Exceptions'

export interface ApiConfiguration {
  apiKey: string,
  axiosConfig?: AxiosRequestConfig,
  baseURL?: string,
  customer: string,
  ote?: boolean,
}

interface IRealtimeRegisterAPI {
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
  tld: TldsApi
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
  tld: TldsApi


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
    this.notification = new NotificationsApi(this.axios, config.customer)
    this.tld = new TldsApi(this.axios, config.customer)
  }

import RealtimeRegisterAPI from '@/Api.ts'

export {
  // Api resource classes
  BillingApi,
  BrandApi,
  ContactApi,
  CustomerApi,
  DnsTemplateApi,
  DnsZoneApi,
  DomainApi,
  HostApi,
  NotificationsApi,
  ProcessApi,
  ProviderApi,
  SiteLockApi,
  SSLApi,
  TldsApi
}

export type { IRealtimeRegisterAPI, ApiConfiguration } from '@/Api.ts'
export default RealtimeRegisterAPI

export type { IBillable } from '@/models/Billable.ts'
export { BillableAction } from '@/models/Billable.ts'

export type {
  BrandField,
  IBrand
} from '@/models/Brand.ts'
export { Locale } from '@/models/Brand.ts'

export type {
  BrandTemplateField,
  BrandTemplateFilterField,
  IBrandTemplate,
  IBrandTemplateMedia
} from '@/models/BrandTemplate.ts'

export type {
  CertificateField,
  CertificateFilterField,
  IAddNote,
  IApprover,
  ICertificate,
  ICertificateImport,
  ICertificateReissue,
  ICertificateRenew,
  ICertificateRequest,
  ICertificateRevoke,
  ICsrDecode,
  ICsrInfo,
  IDcv,
  IResendDcv,
  IScheduleValidationCall,
  ISubscriberAgreement
} from '@/models/Certificate.ts'
export {
  DcvType,
  Language,
  PublicKeyAlgorithm,
  certificateStatus
} from '@/models/Certificate.ts'

export type {
  ContactField,
  ContactFilterField,
  DisclosedField,
  IContact,
  IContactProperties,
  IContactSplit,
  IContactUpdate,
  IContactValidation
} from '@/models/Contact.ts'

export type { ICredit } from '@/models/Credit.ts'

export type { IDNSRecord } from '@/models/DNS.ts'
export { DNSRecordType } from '@/models/DNS.ts'

export type {
  DNSTemplateField,
  DNSTemplateFilterField,
  IDNSTemplate,
  IDNSTemplateCreate,
  IDNSTemplateUpdate
} from '@/models/DNSTemplate.ts'

export type {
  DNSZoneField,
  DNSZoneFilterField,
  IDNSZone,
  IDNSZoneCreate,
  IDNSZoneUpdate
} from '@/models/DNSZone.ts'
export { ZoneService } from '@/models/DNSZone.ts'

export type {
  IDNSZoneStats,
  IQueries
} from '@/models/DNSZoneStats.ts'

export type {
  DomainField,
  DomainFilterField,
  IBillableDomain,
  IDomain,
  IDomainCheckResponse,
  IDomainPushTransfer,
  IDomainRegister,
  IDomainRegisterTransfer,
  IDomainRenew,
  IDomainRestore,
  IDomainTransfer,
  IDomainUpdate,
  IDsData,
  IKeyData,
  IZone
} from '@/models/Domain.ts'
export {
  ContactRole,
  DesignatedAgent,
  DomainStatusEnum,
  TransferContacts
} from '@/models/Domain.ts'

export type { IExchangeRate } from '@/models/ExchangeRate.ts'

export type {
  HostField,
  HostFilterField,
  IAddresses,
  IHost,
  IHostCreate,
  IHostUpdate
} from '@/models/Host.ts'

export { Matcher } from '@/models/ListParams.ts'
export type {
  BrandListParams,
  BrandTemplateListParams,
  ContactListParams,
  DNSTemplateListParams,
  DNSZoneListParams,
  DomainListParams,
  HostListParams,
  ListFilter,
  ListParamsBase,
  NotificationListParams,
  ProcessListParams,
  ProviderDownTimeWindowListParams,
  ProviderListParams,
  SSLListParams,
  SiteLockAccountListParams,
  SiteLockSiteListParams,
  TransactionListParams
} from '@/models/ListParams.ts'

export type {
  IMetaObject,
  IMetadata
} from '@/models/Metadata.ts'
export { PremiumSupportEnum } from '@/models/Metadata.ts'

export type {
  INotification,
  NotificationField,
  NotificationFilterField
} from '@/models/notifications/Notification.ts'

export type {
  INotificationSchedule,
  INotificationScheduleCreate
} from '@/models/NotificationSchedule.ts'

export type { IPage } from '@/models/Page.ts'

export type { IPagination } from '@/models/Pagination.ts'

export type {
  IPrice,
  IPriceChange,
  IProduct,
  IProductPrice,
  IPromo,
  IPromoPrice
} from '@/models/Price.ts'

export type {
  IProcess,
  ProcessField,
  ProcessFilterField
} from '@/models/Process.ts'
export {
  ProcessStatus,
  ResumeType
} from '@/models/Process.ts'

export type {
  CAARecordStatus,
  CertificateRequestValidationStatus,
  ICertificateProcessResponse,
  ICertificateRequestNote,
  ICertificateRequestValidation,
  ICertificateRequestValidationDCV,
  IDomainCreateProcessResponse,
  IDomainRenewProcessResponse,
  IDomainTransferProcessResponse,
  IProcessResponse,
  RiskStatus
} from '@/models/ProcessResponse.ts'
export { CertificateRequestNoteType } from '@/models/ProcessResponse.ts'

export type {
  IProvider,
  IProviderDowntimeWindow,
  ProviderDowntimeWindowField,
  ProviderDowntimeWindowFilterField,
  ProviderField,
  ProviderFilterField
} from '@/models/Provider.ts'

export type { IQuote } from '@/models/Quote.ts'

export type {
  ISiteLockAccount,
  ISiteLockAccountCreate,
  ISiteLockAccountPasswordReset,
  ISiteLockSso,
  SiteLockAccountField,
  SiteLockAccountFilterField,
  SiteLockLanguage
} from '@/models/SiteLockAccount.ts'

export type { ISiteLockAddOn } from '@/models/SiteLockAddOn.ts'

export type { ISiteLockProduct } from '@/models/SiteLockProduct.ts'
export {
  productTypes,
  subscriptionTypes
} from '@/models/SiteLockProduct.ts'

export type {
  ISiteLockSite,
  ISiteLockSiteUpdate,
  SiteLockSiteField,
  SiteLockSiteFilterField
} from '@/models/SiteLockSite.ts'

export type { ISslProduct } from '@/models/SslProduct.ts'
export {
  CertificateType,
  Feature,
  ValidationType
} from '@/models/SslProduct.ts'

export type {
  ITransaction,
  TransactionField,
  TransactionFilterField
} from '@/models/Transaction.ts'

export type {
  ITransferInfo,
  TransferLog
} from '@/models/TransferInfo.ts'
export {
  TransferLogStatus,
  TransferType
} from '@/models/TransferInfo.ts'

export type {
  IValidationCategory,
  IValidationCategoryTerms
} from '@/models/ValidationCategory.ts'
