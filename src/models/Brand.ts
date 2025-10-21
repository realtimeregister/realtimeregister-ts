/** @deprecated Will be removed in the next major release in favor of `listLocales()` in BrandApi. Please move to
 * `listLocales()` as soon as possible. */
export enum Locale {
  'en-US' = 'English (US)',
  'nl-NL' = 'Dutch (NL)',
  'fr-FR' = 'French (FR)',
  'it-IT' = 'Italian (IT)',
  'ko-KR' = 'Korean (KR)',
  'tr-TR' = 'Turkish (TR)',
  'uk-UA' = 'Ukrainian (UA)',
  'da-DK' = 'Danish (DK)',
  'es-ES' = 'Spanish (ES)',
  'pt-PT' = 'Portuguese (PT)',
  'de-DE' = 'German (DE)',
  'fi-FI' = 'Finnish (FI)',
  'et-ET' = 'Estonian (ET)',
  'ru-RU' = 'Russian (RU)',
  'sv-SE' = 'Swedish (SE)',
  'nb-NO' = 'Norwegian (NO)'
}

export interface ILocale {
  code: string
  name: string
}

export class LocaleInfo implements ILocale {
  code: string
  name: string

  constructor (locale: ILocale) {
    this.code = locale.code
    this.name = locale.name
  }
}

export interface IBrand {
  handle: string
  locale?: string
  hideOptionalTerms: boolean
  organization: string
  addressLine: string[]
  postalCode: string
  city: string
  state?: string
  country: string
  email: string
  contactUrl?: string
  url?: string
  voice: string
  fax?: string
  privacyContact?: string
  abuseContact?: string
  createdDate: Date
  updatedDate?: Date
  invalidSpfSince?: Date
}

export type BrandField = keyof IBrand

export default class Brand implements IBrand {
  handle: string
  locale?: ILocale['code']
  hideOptionalTerms: boolean
  organization: string
  addressLine: string[]
  postalCode: string
  city: string
  state?: string
  country: string
  email: string
  contactUrl?: string
  url?: string
  voice: string
  fax?: string
  privacyContact?: string
  abuseContact?: string
  createdDate: Date
  updatedDate?: Date
  invalidSpfSince?: Date

  constructor (brand: IBrand) {
    this.handle = brand.handle
    this.locale = brand.locale
    this.hideOptionalTerms = brand.hideOptionalTerms
    this.organization = brand.organization
    this.addressLine = brand.addressLine
    this.postalCode = brand.postalCode
    this.city = brand.city
    this.state = brand.state
    this.country = brand.country
    this.email = brand.email
    this.contactUrl = brand.contactUrl
    this.url = brand.url
    this.voice = brand.voice
    this.fax = brand.fax
    this.privacyContact = brand.privacyContact
    this.abuseContact = brand.abuseContact
    this.createdDate = brand.createdDate ? new Date(brand.createdDate) : brand.createdDate
    this.updatedDate = brand.updatedDate ? new Date(brand.updatedDate) : brand.updatedDate
    this.invalidSpfSince = brand.invalidSpfSince ? new Date(brand.invalidSpfSince) : brand.invalidSpfSince
  }
}
