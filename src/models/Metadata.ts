import { DomainStatusEnum } from '@/models/Domain'
import { DesignatedAgent } from '@/models/Contact'

export enum PremiumSupportEnum {
  NO = 'NO',
  REGULAR = 'REGULAR',
  CREATE_ONLY = 'CREATE_ONLY',
  TRANSFER_FROM_REGISTRY = 'TRANSFER_FROM_REGISTRY'
}

enum WhoisExposureEnum {
  NONE = 'NONE',
  LIMITED = 'LIMITED',
  FULL = 'FULL',
  UNKNOWN = 'UNKNOWN',
}

enum GDPRCategoryEnum {
  EU_BASED = 'EU_BASED',
  ADEQUACY = 'ADEQUACY',
  DATA_EXPORT = 'DATA_EXPORT',
  UNKNOWN = 'UNKNOWN',
}

enum RenewalOnTransferEnum {
  RENEW_UNLESS_GRACE= 'RENEW_UNLESS_GRACE',
  NEW_PERIOD = 'NEW_PERIOD',
  NO_CHANGE = 'NO_CHANGE',
  RENEWAL = 'RENEWAL',
}

enum FeatureEnum {
  CREATE = 'CREATE',
  RENEW = 'RENEW',
  TRANSFER = 'TRANSFER',
  RESTORE = 'RESTORE',
  UPDATE = 'UPDATE',
  PRIVACY_PROTECT = 'PRIVACY_PROTECT',
  PUSH_TRANSFER = 'PUSH_TRANSFER',
}

interface IRestrictions {
  min: number
  max: number
  required: boolean
}

interface IHostRestrictions {
  addressesIPv4: IRestrictions
  addressesIPv6: IRestrictions
  addressesTotal: IRestrictions
}

interface IContactRestrictions extends IRestrictions {
  organizationRequired: boolean
  organizationAllowed: boolean
}

interface LanguageCode {
  name: string
  allowedCharacters: string
}

interface IDomainRestrictions {
  minLength: number
  maxLength: number
  idnSupport: string
  allowedCharacters: string
  languageCodes: Map<string, LanguageCode>
}

interface MetadataProperty {
  name: string
  label: string
  description: string
  type: string
  mandatory: boolean
}

export interface IMetaObject {
  domainSyntax: IDomainRestrictions
  nameservers: IRestrictions,
  hosts: IHostRestrictions
  registrant: IContactRestrictions,
  adminContacts: IContactRestrictions,
  billingContacts: IContactRestrictions,
  techContacts: IContactRestrictions,
  contactProperties: MetadataProperty[]
  adjustableAuthCode: boolean
  customAuthcodeSupport: boolean
  transferRequiresAuthcode: boolean
  transferSupportsAuthcode: boolean
  createDomainPeriods: number[]
  renewDomainPeriods: number[]
  transferDomainPeriods: number[]
  autoRenewDomainPeriods: number[]
  redemptionPeriod: number
  pendingDeletePeriod: number
  addGracePeriod: number
  autoRenewGracePeriod: number
  renewGracePeriod: number
  transferGracePeriod: number
  possibleClientDomainStatuses: DomainStatusEnum[]
  allowedDnssecRecords: number
  allowedDnssecAlgorithms: number[]
  creationRequiresPreValidation: boolean
  transferFOA: boolean
  zoneCheck: string
  expiryDateOffset: number
  featuresAvailable: FeatureEnum[]
  jurisdiction: string
  termsOfService: string
  privacyPolicy: string
  whoisExposure: WhoisExposureEnum
  gdprCategory: GDPRCategoryEnum
  registrationNotice: string
  premiumSupport: PremiumSupportEnum,
  restoreIncludesRenew: boolean
  renewalOnTransfer: RenewalOnTransferEnum
  allowDesignatedAgent: DesignatedAgent
}

export interface IMetadata {
  hash: string
  applicableFor: string[]
  metadata?: IMetaObject
  provider?: string
}

export default class Metadata implements IMetadata {
  hash: string
  applicableFor: string[]
  metadata?: IMetaObject
  provider?: string

  constructor (metadata: IMetadata) {
    this.hash = metadata.hash
    this.applicableFor = metadata.applicableFor
    this.metadata = metadata.metadata
    this.provider = metadata.provider
  }
}
