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
export type ListParamsBase = {
  limit?: number
  offset?: number
  order?: string[]
  total?: boolean
  q?: string
  fields?: string[]
  filters: ListFilter[]
}

/** List parameters for domain listings */
export type DomainListParams = ListParamsBase & {
  fields?: DomainField[]
  filters: ListFilter<DomainFilterField>[]
}

/** List parameters for contact listings */
export type ContactListParams = ListParamsBase & {
  fields?: ContactField[]
  filters: ListFilter<ContactFilterField>[]
}

/** List parameters for brand listings */
export type BrandListParams = ListParamsBase & {
  fields?: BrandField[]
  filters: ListFilter<BrandField>[]
}

/** List parameters for brand template listings */
export type BrandTemplateListParams = ListParamsBase & {
  fields?: BrandTemplateField[]
  filters: ListFilter<BrandTemplateFilterField>[]
}

/** List parameters for DNS template listings */
export type DNSTemplateListParams = ListParamsBase & {
  fields?: DNSTemplateField[]
  filters: ListFilter<DNSTemplateFilterField>[]
}

/** List parameters for DNS zone listings */
export type DNSZoneListParams = ListParamsBase & {
  fields?: DNSZoneField[]
  filters: ListFilter<DNSZoneFilterField>[]
}

/** List parameters for host listings */
export type HostListParams = ListParamsBase & {
  fields?: HostField[]
  filters: ListFilter<HostFilterField>[]
}

/** List parameters for notification listings */
export type NotificationListParams = ListParamsBase & {
  fields?: NotificationField[]
  filters: ListFilter<NotificationFilterField>[]
}

/** List parameters for process listings */
export type ProcessListParams = ListParamsBase & {
  fields?: ProcessField[]
  filters: ListFilter<ProcessFilterField>[]
}

/** List parameters for provider listings */
export type ProviderListParams = ListParamsBase & {
  fields?: ProviderField[]
  filters: ListFilter<ProviderFilterField>[]
}

/** List parameters for provider downtime window listings */
export type ProviderDownTimeWindowListParams = ListParamsBase & {
  fields?: ProviderDowntimeWindowField[]
  filters: ListFilter<ProviderDowntimeWindowFilterField>[]
}

/** List parameters for Sitelock account listings */
export type SiteLockAccountListParams = ListParamsBase & {
  fields?: SiteLockAccountField[]
  filters: ListFilter<SiteLockAccountFilterField>[]
}

/** List parameters for Sitelock site listings */
export type SiteLockSiteListParams = ListParamsBase & {
  fields?: SiteLockSiteField[]
  filters: ListFilter<SiteLockSiteFilterField>[]
}

/** List parameters for SSL listings */
export type SSLListParams = ListParamsBase & {
  fields?: CertificateField[]
  filters: ListFilter<CertificateFilterField>[]
}

/** List parameters for SSL product listings */
export type SSLProductListParams = ListParamsBase & {
  fields?: SslProductField[]
  filters: ListFilter<SslProductFilterField>[]
}

/** List parameters for transaction listings */
export type TransactionListParams = ListParamsBase & {
  fields?: TransactionField[]
  filters: ListFilter<TransactionFilterField>[]
}

/** List parameters for validation categories */
export type ValidationCategoryListParams = ListParamsBase & {
  fields?: ValidationCategoryField[]
  filters: ListFilter<ValidationCategoryFilterField>[]
}

/** List parameters for registry accounts. */
export type RegistryAccountListParams = ListParamsBase & {
  fields?: RegistryAccountField[],
  filters: ListFilter<RegistryAccountFilterField>[]
}

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
  | RegistryAccountListParams

export default ListParams
