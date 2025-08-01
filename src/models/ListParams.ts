import type { DomainField, DomainFilterField } from '@/models/Domain'
import type { ContactFilterField, ContactField } from '@/models/Contact'
import type { BrandField } from '@/models/Brand'
import type { BrandTemplateField, BrandTemplateFilterField } from '@/models/BrandTemplate'
import type { DNSTemplateField, DNSTemplateFilterField } from '@/models/DNSTemplate'
import type { DNSZoneField, DNSZoneFilterField } from '@/models/DNSZone'
import type { HostField, HostFilterField } from '@/models/Host'
import type { NotificationField, NotificationFilterField } from '@/models/notifications/Notification'
import type { ProcessField, ProcessFilterField } from '@/models/Process'
import type {
  ProviderDowntimeWindowField,
  ProviderDowntimeWindowFilterField,
  ProviderField,
  ProviderFilterField
} from '@/models/Provider'
import type { SiteLockSiteField, SiteLockSiteFilterField } from '@/models/SiteLockSite'
import type { SiteLockAccountField, SiteLockAccountFilterField } from '@/models/SiteLockAccount'
import type { CertificateField, CertificateFilterField } from '@/models/Certificate'
import type { TransactionField, TransactionFilterField } from '@/models/Transaction'

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

/** List parameters for transaction listings */
export type TransactionListParams = ListParamsBase & {
  fields?: TransactionField[]
  filters: ListFilter<TransactionFilterField>[]
}

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
  | TransactionListParams

export default ListParams
