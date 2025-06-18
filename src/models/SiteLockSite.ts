import SiteLockAddOn, { ISiteLockAddOn } from '@/models/SiteLockAddOn'

export interface ISiteLockSite {
  account: string
  customer: string
  domainName: string
  plan: string
  createdDate: Date
  updatedDate?: Date
  renewalDate: Date
  addOns?: ISiteLockAddOn[]
}

export interface ISiteLockSiteUpdate {
  account?: string
  plan?: string
  domainName: string
}

export default class SiteLockSite implements ISiteLockSite {
  account: string
  customer: string
  domainName: string
  plan: string
  createdDate: Date
  updatedDate?: Date
  renewalDate: Date
  addOns?: SiteLockAddOn[]

  constructor (response: ISiteLockSite) {
    this.account = response.account
    this.customer = response.customer
    this.domainName = response.domainName
    this.plan = response.plan
    this.createdDate = response.createdDate ? new Date(response.createdDate) : response.createdDate
    this.updatedDate = response.updatedDate ? new Date(response.updatedDate) : response.updatedDate
    this.renewalDate = response.renewalDate ? new Date(response.renewalDate) : response.renewalDate
    if (response.addOns) {
      this.addOns = response.addOns.map(c => new SiteLockAddOn(c))
    }
  }
}
