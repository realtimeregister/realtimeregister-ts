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

import type ListParams from '@/models/ListParams.ts'

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
  TldsApi,
  ValidationApi,
  type ListParams,
}

export type { IRealtimeRegisterAPI, ApiConfiguration } from '@/Api.ts'
export default RealtimeRegisterAPI

export type { IBillable } from '@/models/Billable.ts'
export { BillableAction } from '@/models/Billable.ts'
import { Billable } from '@/models/Billable.ts'

export type {
  BrandField,
  IBrand,
  ILocale
} from '@/models/Brand.ts'
export { Locale } from '@/models/Brand.ts'
import Brand from '@/models/Brand.ts'

export type {
  BrandTemplateField,
  BrandTemplateFilterField,
  IBrandTemplate,
  IBrandTemplateMedia
} from '@/models/BrandTemplate.ts'
import BrandTemplate from '@/models/BrandTemplate.ts'

export type {
  CertificateDownloadFormat,
  CertificateField,
  CertificateFilterField,
  IAddNote,
  IApprover,
  ICertificate,
  ICertificateDownload,
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
import { CsrInfo } from '@/models/Certificate.ts'
import Certificate from '@/models/Certificate.ts'

export type {
  ContactField,
  ContactFilterField,
  DisclosedField,
  IContact,
  IContactProperties,
  IContactSplit,
  IContactUpdate,
  IContactValidation,
  ContactScope
} from '@/models/Contact.ts'
import Contact from '@/models/Contact.ts'

export type { ICredit } from '@/models/Credit.ts'
import Credit from '@/models/Credit.ts'

export type { IDNSRecord } from '@/models/DNS.ts'
export { DNSRecordType } from '@/models/DNS.ts'
import { DNSRecord } from '@/models/DNS.ts'

export type {
  DNSTemplateField,
  DNSTemplateFilterField,
  IDNSTemplate,
  IDNSTemplateCreate,
  IDNSTemplateUpdate
} from '@/models/DNSTemplate.ts'
import DNSTemplate from '@/models/DNSTemplate.ts'

export type {
  DNSZoneField,
  DNSZoneFilterField,
  IDNSZone,
  IDNSZoneCreate,
  IDNSManagedZoneUpdate,
  IDNSZoneUpdate
} from '@/models/DNSZone.ts'
export { ZoneService } from '@/models/DNSZone.ts'
import DNSZone from '@/models/DNSZone.ts'

export type {
  IDNSZoneStats,
  IQueries
} from '@/models/DNSZoneStats.ts'
import DNSZoneStats from '@/models/DNSZoneStats.ts'

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
import Domain from '@/models/Domain.ts'

export type { IExchangeRate } from '@/models/ExchangeRate.ts'
import ExchangeRate from '@/models/ExchangeRate.ts'

export type {
  HostField,
  HostFilterField,
  IAddresses,
  IHost,
  IHostCreate,
  IHostUpdate
} from '@/models/Host.ts'
import Host from '@/models/Host.ts'

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
  TransactionListParams,
  RegistryAccountListParams
} from '@/models/ListParams.ts'

export type {
  IMetaObject,
  IMetadata,
  IContactRestrictions,
  IRegistrantRestrictions,
  IRestrictions,
  IHostRestrictions,
  LanguageCode,
  IDomainRestrictions,
  MetadataProperty
} from '@/models/Metadata.ts'
export { PremiumSupportEnum, FeatureEnum, WhoisExposureEnum, GDPRCategoryEnum, RenewalOnTransferEnum } from '@/models/Metadata.ts'
import Metadata from '@/models/Metadata.ts'

export type {
  INotification,
  NotificationField,
  NotificationFilterField,
  SubjectStatus
} from '@/models/notifications/Notification.ts'
import Notification from '@/models/notifications/Notification.ts'

export type {
  IBillingNotification
} from '@/models/notifications/BillingNotification.ts'
import BillingNotification from '@/models/notifications/BillingNotification.ts'

export type {
  ICreateDomainNotification
} from '@/models/notifications/CreateDomainNotification.ts'
import CreateDomainNotification from '@/models/notifications/CreateDomainNotification.ts'

export type {
  IDomainExpiryReportNotification
} from '@/models/notifications/DomainExpiryReportNotification.ts'
import DomainExpiryReportNotification from '@/models/notifications/DomainExpiryReportNotification.ts'

export type {
  IDomainNotification
} from '@/models/notifications/DomainNotification.ts'
import DomainNotification from '@/models/notifications/DomainNotification.ts'

export type {
  IHostNotification
} from '@/models/notifications/HostNotification.ts'
import HostNotification from '@/models/notifications/HostNotification.ts'

export type {
  IPremiumDomainChangePriceNotification
} from '@/models/notifications/PremiumDomainChangePriceNotification.ts'
import PremiumDomainChangePriceNotification from '@/models/notifications/PremiumDomainChangePriceNotification.ts'

export type {
  IRenewDomainNotification
} from '@/models/notifications/RenewDomainNotification.ts'
import RenewDomainNotification from '@/models/notifications/RenewDomainNotification.ts'

export type {
  ISSLCertificateExpiryReportNotification
} from '@/models/notifications/SSLCertificateExpiryReportNotification.ts'
import SSLCertificateExpiryReportNotification from '@/models/notifications/SSLCertificateExpiryReportNotification.ts'

export type {
  ISSLCertificateNotification
} from '@/models/notifications/SSLCertificateNotification.ts'
import SSLCertificateNotification from '@/models/notifications/SSLCertificateNotification.ts'

export type {
  ITransferDomainNotification
} from '@/models/notifications/TransferDomainNotification.ts'
import TransferDomainNotification from '@/models/notifications/TransferDomainNotification.ts'

export type {
  IUpdatePriceGroupNotification
} from '@/models/notifications/UpdatePriceGroupNotification.ts'
import UpdatePriceGroupNotification from '@/models/notifications/UpdatePriceGroupNotification.ts'

export type {
  INotificationSchedule,
  INotificationScheduleCreate
} from '@/models/NotificationSchedule.ts'
import NotificationSchedule from '@/models/NotificationSchedule.ts'

export type { IPage } from '@/models/Page.ts'
import Page from '@/models/Page.ts'

export type { IPagination } from '@/models/Pagination.ts'
import Pagination from '@/models/Pagination.ts'

export type {
  IPriceList,
  IPriceChange,
  IPrices,
  IPromo
} from '@/models/PriceList.ts'
import PriceList from '@/models/PriceList.ts'

export type {
  IProcess,
  ProcessField,
  ProcessFilterField
} from '@/models/process/Process.ts'

export {
  ProcessStatus,
  ResumeType
} from '@/models/process/Process.ts'
import Process from '@/models/process/Process.ts'

export type {
  IProcessResponse,
} from '@/models/process/ProcessResponse.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'

export type {
  CAARecordStatus,
  CertificateRequestValidationStatus,
  ICertificateProcessResponse,
  ICertificateRequestNote,
  ICertificateRequestValidation,
  ICertificateRequestValidationDCV,
  RiskStatus
} from '@/models/process/CertificateProcess.ts'
export { CertificateRequestNoteType } from '@/models/process/CertificateProcess.ts'
import { CertificateRequestValidation, CertificateRequestValidationDCV, CertificateRequestNote, CertificateProcessResponse } from '@/models/process/CertificateProcess.ts'

export type {
  IDomainCreateProcessResponse,
  IDomainRenewProcessResponse,
  IDomainTransferProcessResponse,
  IDomainUpdateProcessResponse,
  IDomainRestoreProcessResponse
} from '@/models/process/DomainProcess.ts'
import {
  DomainCreateProcessResponse,
  DomainRenewProcessResponse,
  DomainTransferProcessResponse,
  DomainUpdateProcessResponse,
  DomainRestoreProcessResponse
} from '@/models/process/DomainProcess.ts'

export type {
  IProvider,
  IProviderDowntimeWindow,
  ProviderDowntimeWindowField,
  ProviderDowntimeWindowFilterField,
  ProviderField,
  ProviderFilterField
} from '@/models/Provider.ts'
import { Provider, ProviderDowntimeWindow } from '@/models/Provider.ts'

export type { IQuote } from '@/models/Quote.ts'
import Quote from '@/models/Quote.ts'

export type {
  ISiteLockAccount,
  ISiteLockAccountCreate,
  ISiteLockAccountPasswordReset,
  ISiteLockSso,
  SiteLockAccountField,
  SiteLockAccountFilterField,
  SiteLockLanguage
} from '@/models/SiteLockAccount.ts'
export { SiteLockLanguages } from '@/models/SiteLockAccount.ts'
import { SiteLockAccount, SiteLockSso } from '@/models/SiteLockAccount.ts'

export type { ISiteLockAddOn } from '@/models/SiteLockAddOn.ts'
import SiteLockAddOn from '@/models/SiteLockAddOn.ts'

export type { ISiteLockProduct } from '@/models/SiteLockProduct.ts'
export {
  productTypes,
  subscriptionTypes
} from '@/models/SiteLockProduct.ts'
import SiteLockProduct from '@/models/SiteLockProduct.ts'

export type {
  ISiteLockSite,
  ISiteLockSiteUpdate,
  SiteLockSiteField,
  SiteLockSiteFilterField
} from '@/models/SiteLockSite.ts'
import SiteLockSite from '@/models/SiteLockSite.ts'

export type { ISslProduct } from '@/models/SslProduct.ts'
export {
  CertificateType,
  Feature,
  ValidationType
} from '@/models/SslProduct.ts'
import SslProduct from '@/models/SslProduct.ts'

export type {
  ITransaction,
  TransactionField,
  TransactionFilterField
} from '@/models/Transaction.ts'
import Transaction from '@/models/Transaction.ts'

export type {
  ITransferInfo,
  TransferLog
} from '@/models/TransferInfo.ts'
export {
  TransferLogStatus,
  TransferType
} from '@/models/TransferInfo.ts'
import TransferInfo from '@/models/TransferInfo.ts'

export type {
  IValidationCategory,
  IValidationCategoryTerms,
  ValidationCategoryFilterField,
  ValidationCategoryField
} from '@/models/ValidationCategory.ts'
import ValidationCategory from '@/models/ValidationCategory.ts'

export type {
  IDomainGateway,
  IContactRegistryAccount,
  IRegistryAccount,
  IntendedUsage,
  RegistryAccountField,
  RegistryAccountFilterField
} from '@/models/Gateway.ts'
import { RegistryAccount } from '@/models/Gateway.ts'

/** All model classes */
export {
  Billable,
  Brand,
  BrandTemplate,
  CsrInfo,
  Certificate,
  Contact,
  Credit,
  DNSRecord,
  DNSTemplate,
  DNSZone,
  DNSZoneStats,
  Domain,
  ExchangeRate,
  Host,
  Metadata,
  BillingNotification,
  CreateDomainNotification,
  DomainExpiryReportNotification,
  DomainNotification,
  HostNotification,
  Notification,
  PremiumDomainChangePriceNotification,
  RenewDomainNotification,
  SSLCertificateExpiryReportNotification,
  SSLCertificateNotification,
  TransferDomainNotification,
  UpdatePriceGroupNotification,
  NotificationSchedule,
  Page,
  Pagination,
  PriceList,
  Process,
  ProcessResponse,
  CertificateRequestValidation,
  CertificateRequestValidationDCV,
  CertificateRequestNote,
  CertificateProcessResponse,
  DomainCreateProcessResponse,
  DomainRenewProcessResponse,
  DomainTransferProcessResponse,
  DomainUpdateProcessResponse,
  DomainRestoreProcessResponse,
  Provider,
  ProviderDowntimeWindow,
  Quote,
  SiteLockAccount,
  SiteLockSso,
  SiteLockAddOn,
  SiteLockProduct,
  SiteLockSite,
  SslProduct,
  Transaction,
  TransferInfo,
  ValidationCategory,
  RegistryAccount
}

