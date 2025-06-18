/**
 * Todo waiting for backend
 * SiteLock File and Database Backup
 * SiteLock Virtual Private Network (VPN)
 * SiteLock Dark Web Monitoring
 * SiteLock Security Awareness Training
 */
export enum productTypes {
  SCAN = 'SCAN',
  WAF = 'WAF',
  PCI = 'PCI'
}

export enum subscriptionTypes {
  PLAN = 'PLAN',
  ADDON = 'ADDON',
  BUNDLE = 'BUNDLE'
}

export interface ISiteLockProduct {
  name: string
  period: number
  product: string
  productType: productTypes
  subscriptionType: subscriptionTypes
}

export default class SiteLockProduct implements ISiteLockProduct {
  name: string
  period: number
  product: string
  productType: productTypes
  subscriptionType: subscriptionTypes

  constructor (response: ISiteLockProduct) {
    this.name = response.name
    this.period = response.period
    this.product = response.product
    this.productType = response.productType
    this.subscriptionType = response.subscriptionType
  }
}
