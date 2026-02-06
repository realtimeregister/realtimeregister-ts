import type { DomainField, DomainFilterField } from '@/models/Domain.ts'
import type { ContactFilterField, ContactField } from '@/models/Contact.ts'
import type { BrandField } from '@/models/Brand.ts'
import type { BrandTemplateField, BrandTemplateFilterField } from '@/models/BrandTemplate.ts'
import type { DNSTemplateField, DNSTemplateFilterField } from '@/models/DNSTemplate.ts'
import type { DNSZoneField, DNSZoneFilterField } from '@/models/DNSZone.ts'
import type { HostField, HostFilterField } from '@/models/Host.ts'
import type { NotificationField, NotificationFilterField } from '@/models/notifications/Notification.ts'
import type { ProcessField, ProcessFilterField } from '@/models/process/Process.ts'
import type {
  ProviderDowntimeWindowField,
  ProviderDowntimeWindowFilterField,
  ProviderField,
  ProviderFilterField
} from '@/models/Provider.ts'
import type { SiteLockSiteField, SiteLockSiteFilterField } from '@/models/SiteLockSite.ts'
import type { SiteLockAccountField, SiteLockAccountFilterField } from '@/models/SiteLockAccount.ts'
import type { CertificateField, CertificateFilterField } from '@/models/Certificate.ts'
import type { TransactionField, TransactionFilterField } from '@/models/Transaction.ts'
import { ValidationCategoryField, ValidationCategoryFilterField } from '@/models/ValidationCategory.ts'
import { SslProductField, SslProductFilterField } from '@/models/SslProduct.ts'
import { AcmeSubscriptionField, AcmeSubscriptionFilterField } from '@/models/AcmeSubscription.ts'
import type { RegistryAccountField, RegistryAccountFilterField } from '@/models/Gateway.ts'

export const Matcher = {
  eq: 'EQUALS',
  ne: 'NOT_EQUALS',
  not_like: 'NOT_LIKE',
  gt: 'GREATER_THAN',
  lt: 'LESS_THAN',
  lte: 'LESS_THAN_OR_EQUALS',
  gte: 'GREATER_THAN_OR_EQUALS',
  null: 'IS_NULL',
  not_null: 'IS_NOT_NULL',
  like: 'LIKE',
  in: 'IN',
  not_in: 'NOT_IN'
} as const

export interface ListFilter<T = any> {
  field: T
  matcher?: keyof typeof Matcher
  value: string | string[]
}

/** Base of all list parameter types */
export type ListParamsBase<F extends string = string, LFF extends string = string> = {
  limit?: number
  offset?: number
  order?: string[]
  total?: boolean
  q?: string
  fields?: F[]
  filters: ListFilter<LFF>[]
}

/** List parameters for domain listings */
export type DomainListParams = ListParamsBase<DomainField, DomainFilterField>

/** List parameters for contact listings */
export type ContactListParams = ListParamsBase<ContactField, ContactFilterField>

/** List parameters for brand listings */
export type BrandListParams = ListParamsBase<BrandField, BrandField>

/** List parameters for brand template listings */
export type BrandTemplateListParams = ListParamsBase<BrandTemplateField, BrandTemplateFilterField>

/** List parameters for DNS template listings */
export type DNSTemplateListParams = ListParamsBase<DNSTemplateField, DNSTemplateFilterField>

/** List parameters for DNS zone listings */
export type DNSZoneListParams = ListParamsBase<DNSZoneField, DNSZoneFilterField>

/** List parameters for host listings */
export type HostListParams = ListParamsBase<HostField, HostFilterField>

/** List parameters for notification listings */
export type NotificationListParams = ListParamsBase<NotificationField, NotificationFilterField>

/** List parameters for process listings */
export type ProcessListParams = ListParamsBase<ProcessField, ProcessFilterField>

/** List parameters for provider listings */
export type ProviderListParams = ListParamsBase<ProviderField, ProviderFilterField>

/** List parameters for provider downtime window listings */
export type ProviderDownTimeWindowListParams = ListParamsBase<ProviderDowntimeWindowField, ProviderDowntimeWindowFilterField>

/** List parameters for Sitelock account listings */
export type SiteLockAccountListParams = ListParamsBase<SiteLockAccountField, SiteLockAccountFilterField>

/** List parameters for Sitelock site listings */
export type SiteLockSiteListParams = ListParamsBase<SiteLockSiteField, SiteLockSiteFilterField>

/** List parameters for SSL listings */
export type SSLListParams = ListParamsBase<CertificateField, CertificateFilterField>

/** List parameters for SSL product listings */
export type SSLProductListParams = ListParamsBase<SslProductField, SslProductFilterField>

/** List parameters for transaction listings */
export type TransactionListParams = ListParamsBase<TransactionField, TransactionFilterField>

/** List parameters for validation categories */
export type ValidationCategoryListParams = ListParamsBase<ValidationCategoryField, ValidationCategoryFilterField>

export type AcmeSubscriptionListParams = ListParamsBase<AcmeSubscriptionField, AcmeSubscriptionFilterField>

/** List parameters for registry accounts. */
export type RegistryAccountListParams = ListParamsBase<RegistryAccountField, RegistryAccountFilterField>

/**
 * Union of all available list parameter types.
 * @link https://dm.realtimeregister.com/docs/api/listings
 */
type ListParams =
  ListParamsBase
  | DomainListParams
  | ContactListParams
  | BrandListParams
  | BrandTemplateListParams
  | DNSTemplateListParams
  | DNSZoneListParams
  | NotificationListParams
  | ProcessListParams
  | ProviderListParams
  | ProviderDownTimeWindowListParams
  | HostListParams
  | SiteLockAccountListParams
  | SiteLockSiteListParams
  | SSLListParams
  | SSLProductListParams
  | TransactionListParams
  | ValidationCategoryListParams
  | AcmeSubscriptionListParams
  | RegistryAccountListParams

export default ListParams
