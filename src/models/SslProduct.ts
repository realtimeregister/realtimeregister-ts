export enum ValidationType {
  DOMAIN_VALIDATION = 'DOMAIN_VALIDATION',
  ORGANIZATION_VALIDATION = 'ORGANIZATION_VALIDATION',
  EXTENDED_VALIDATION = 'EXTENDED_VALIDATION'
}

export enum CertificateType {
  SINGLE_DOMAIN = 'SINGLE_DOMAIN',
  MULTI_DOMAIN = 'MULTI_DOMAIN',
  WILDCARD = 'WILDCARD'
}

export enum Feature {
  REISSUE = 'REISSUE',
  WILDCARD = 'WILDCARD',
  WWW_INCLUDED = 'WWW_INCLUDED',
  NON_WWW_INCLUDED = 'NON_WWW_INCLUDED'
}

export interface ISslProduct {
  product: string
  brand: string
  name: string
  validationType: ValidationType
  certificateType: CertificateType
  features?: Feature[]
  periods: number[]
  warranty: number
  issueTime: string
  renewalWindow: number
  includedDomains?: number
  maxDomains?: number
  requiredFields?: string[]
  optionalFields?: string[]
  renewFrom?: string[]
}

export default class SslProduct implements ISslProduct {
  product: string
  brand: string
  name: string
  validationType: ValidationType
  certificateType: CertificateType
  features?: Feature[]
  periods: number[]
  warranty: number
  issueTime: string
  renewalWindow: number
  includedDomains?: number
  maxDomains?: number
  requiredFields?: string[]
  optionalFields?: string[]
  renewFrom?: string[]

  constructor (product: ISslProduct) {
    this.product = product.product
    this.brand = product.brand
    this.name = product.name
    this.validationType = product.validationType
    this.certificateType = product.certificateType
    this.features = product.features
    this.periods = product.periods
    this.warranty = product.warranty
    this.issueTime = product.issueTime
    this.renewalWindow = product.renewalWindow
    this.includedDomains = product.includedDomains
    this.maxDomains = product.maxDomains
    this.requiredFields = product.requiredFields
    this.optionalFields = product.optionalFields
    this.renewFrom = product.renewFrom
  }
}
