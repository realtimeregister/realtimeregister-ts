import { ISiteLockSite } from '@/models/SiteLockSite.ts'

export const SiteLockLanguages = {
  EN: 'English',
  NL: 'Dutch',
  FR: 'French',
  DE: 'German',
  ES: 'Spanish',
  IT: 'Italian',
  PT: 'Portuguese',
  EL: 'Greek',
  JP: 'Japanese',
  ZH: 'Chinese'
} as const

export type SiteLockLanguage = keyof typeof SiteLockLanguages

export interface ISiteLockAccount {
  username: string
  customer: string
  brand: string
  createdDate: Date
  updatedDate?: Date
  sites?: ISiteLockSite[]
}

export type SiteLockAccountField = keyof ISiteLockAccount
export type SiteLockAccountFilterField = Exclude<SiteLockAccountField, 'sites' | 'customer'> | 'site'

export interface ISiteLockAccountPasswordReset {
  username: string
  password: string
}

export interface ISiteLockAccountCreate {
  username: string
  email: string
  password?: string
  language?: SiteLockLanguage
  brand?: string
  domainName: string
  plan: string
}

export interface ISiteLockSso {
  url: string
}

class SiteLockAccount implements ISiteLockAccount {
  username: string
  customer: string
  brand: string
  createdDate: Date
  updatedDate?: Date
  sites?: ISiteLockSite[]

  constructor (response: ISiteLockAccount) {
    this.username = response.username
    this.customer = response.customer
    this.brand = response.brand
    this.createdDate = response.createdDate ? new Date(response.createdDate) : response.createdDate
    this.updatedDate = response.updatedDate ? new Date(response.updatedDate) : response.updatedDate
    this.sites = response.sites
  }
}

class SiteLockSso implements ISiteLockSso {
  url: string

  constructor (response: ISiteLockSso) {
    this.url = response.url
  }
}

export {
  SiteLockAccount,
  SiteLockSso
}
