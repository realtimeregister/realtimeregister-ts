export interface ISiteLockAddOn {
  id: number
  product: string
  createdDate: Date
  updatedDate?: Date
  renewalDate: Date
}

export default class SiteLockAddOn implements ISiteLockAddOn {
  id: number
  product: string
  createdDate: Date
  updatedDate?: Date
  renewalDate: Date

  constructor (response: ISiteLockAddOn) {
    this.id = response.id
    this.product = response.product
    this.createdDate = response.createdDate ? new Date(response.createdDate) : response.createdDate
    this.updatedDate = response.updatedDate ? new Date(response.updatedDate) : response.updatedDate
    this.renewalDate = response.renewalDate ? new Date(response.renewalDate) : response.renewalDate
  }
}
