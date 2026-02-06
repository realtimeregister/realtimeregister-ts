import { IApprover } from '@/models/Certificate.ts'

export interface IAcmeGetCredentialsResponse {
  directoryUrl: string
  accountKey: string
  hmacKey: string
}

export class AcmeCredentials implements IAcmeGetCredentialsResponse {
  directoryUrl: string
  accountKey: string
  hmacKey: string

  constructor(credentials: IAcmeGetCredentialsResponse) {
    this.directoryUrl = credentials.directoryUrl
    this.accountKey = credentials.accountKey
    this.hmacKey = credentials.hmacKey
  }

}

export const AcmeSubscriptionStatuses = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  REVOKED: 'REVOKED',
  PENDING_ORGANIZATION_VALIDATION: 'PENDING_ORGANIZATION_VALIDATION'
}
export type AcmeSubscriptionStatus = keyof typeof AcmeSubscriptionStatuses

export interface IAcmeSubscription {
  id: number
  product: string
  organization?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  createdDate: Date
  updatedDate?: Date
  expiryDate: Date
  period: number
  directoryUrl: string
  autoRenew: boolean
  certValidity?: number
  orgValidUntil?: Date
  status: AcmeSubscriptionStatus
  approver?: IApprover
  domainNames?: string[]
}
export type AcmeSubscriptionField = keyof IAcmeSubscription
export type AcmeSubscriptionFilterField = Exclude<
  AcmeSubscriptionField, 'period' | 'approver' | 'certValidity' | 'orgValidUntil' | 'directoryUrl' | 'autoRenew'
>

export default class AcmeSubscription implements IAcmeSubscription {
  id: number
  product: string
  organization?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  createdDate: Date
  updatedDate?: Date
  expiryDate: Date
  period: number
  directoryUrl: string
  autoRenew: boolean
  certValidity?: number
  orgValidUntil?: Date
  status: AcmeSubscriptionStatus
  approver?: IApprover
  domainNames?: string[]

  constructor(subscriptionData: IAcmeSubscription) {
    this.id = subscriptionData.id
    this.product = subscriptionData.product
    this.organization = subscriptionData.organization
    this.address = subscriptionData.address
    this.city = subscriptionData.city
    this.state = subscriptionData.state
    this.postalCode = subscriptionData.postalCode
    this.country = subscriptionData.country
    this.createdDate = new Date(subscriptionData.createdDate)
    this.updatedDate = subscriptionData.updatedDate ? new Date(subscriptionData.updatedDate) : subscriptionData.updatedDate
    this.expiryDate = new Date(subscriptionData.expiryDate)
    this.period = subscriptionData.period
    this.directoryUrl = subscriptionData.directoryUrl
    this.autoRenew = subscriptionData.autoRenew
    this.certValidity = subscriptionData.certValidity
    this.orgValidUntil = subscriptionData.orgValidUntil ? new Date(subscriptionData.orgValidUntil) : subscriptionData.orgValidUntil
    this.status = subscriptionData.status
    this.approver = subscriptionData.approver
    this.domainNames = subscriptionData.domainNames
  }

}

export interface IAcmeSubscriptionCreate {
  /** The customer handle */
  customer: string
  /** The product defines the type of certificate to create */
  product: string
  /** List of domain names */
  domainNames?: string[]
  /** Organization name */
  organization?: string
  /** Country code (ISO 3166-1 alpha-2) */
  country?: string
  /** State or province */
  state?: string
  /** Street address */
  address?: string
  /** Postal code */
  postalCode?: string
  /** City */
  city?: string
  /** Automatically renew subscription */
  autoRenew?: boolean
  /** Validity period of the subscription */
  period: number
  /** Certificate validity in days (DigiCert only) */
  certValidity?: number
  /** Approver information */
  approver?: IApprover
}
export type IAcmeSubscriptionUpdate = Exclude<Partial<IAcmeSubscription>, 'customer' | 'product' > & {
  id: number
}

export interface IAcmeSubscriptionRenew {
  id: number
  period: number
}
