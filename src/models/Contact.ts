export interface IContactValidation {
  validatedOn: Date
  version: number
  category: string
}

export const ContactScopes = {
  REGISTRY: 'REGISTRY',
  REGISTRY_PARTIAL: 'REGISTRY_PARTIAL',
  REGISTRAR: 'REGISTRAR',
  IGNORED: 'IGNORED'
}
export type ContactScope = keyof typeof ContactScopes

export const DisclosedFields = {
  'registryContactId': 'registryContactId',
  'name': 'name',
  'organization': 'organization',
  'addressLine': 'addressLine',
  'postalCode': 'postalCode',
  'city': 'city',
  'email': 'email',
  'voice': 'voice',
  'fax': 'fax',
  'state': 'state',
  'country': 'country'
} as const
export type DisclosedField = keyof typeof DisclosedFields

export enum DesignatedAgent {
  'NONE' = 'NONE',
  'OLD' = 'OLD',
  'NEW' = 'NEW',
  'BOTH' = 'BOTH'
}

export interface IContactSplit {
  newHandle: string
  registries?: string[]
}

export interface IContactProperties {
  properties: Record<string, string>
}

export class ContactValidation implements IContactValidation {
  validatedOn: Date
  version: number
  category: string

  constructor (validation: IContactValidation) {
    this.validatedOn = validation.validatedOn ? new Date(validation.validatedOn) : validation.validatedOn
    this.version = validation.version
    this.category = validation.category
  }
}

export interface IContact {
  brand: string
  city: string
  country: string
  createdDate: Date
  disclosedFields?: DisclosedField[]
  updatedDate?: Date
  customer: string
  email: string
  fax?: string
  handle: string
  name: string
  organization?: string
  postalCode: string
  state?: string
  voice: string
  addressLine: string[]
  registries?: string[]
  properties?: Map<string, Map<string, string>>
  validations?: IContactValidation[]
}

export type ContactField = keyof Contact
export type ContactFilterField = Exclude<ContactField, 'validations' | 'properties' | 'customer' | 'registries'> | 'validation'

export interface IContactUpdate extends IContact{
  designatedAgent?: DesignatedAgent
}

export default class Contact implements IContact {
  brand: string
  city: string
  country: string
  createdDate: Date
  disclosedFields: DisclosedField[]
  updatedDate?: Date
  customer: string
  email: string
  fax?: string
  handle: string
  name: string
  organization?: string
  postalCode: string
  state?: string
  voice: string
  addressLine: string[]
  registries?: string[]
  properties?: Map<string, Map<string, string>>
  validations?: ContactValidation[]

  constructor (contact: IContact) {
    this.brand = contact.brand
    this.city = contact.city
    this.country = contact.country
    this.disclosedFields = contact.disclosedFields ?? []
    this.createdDate = contact.createdDate ? new Date(contact.createdDate) : contact.createdDate
    this.updatedDate = contact.updatedDate ? new Date(contact.updatedDate) : contact.updatedDate
    this.customer = contact.customer
    this.email = contact.email
    this.fax = contact.fax
    this.handle = contact.handle
    this.name = contact.name
    this.organization = contact.organization
    this.postalCode = contact.postalCode
    this.state = contact.state
    this.voice = contact.voice
    this.addressLine = contact.addressLine
    this.registries = contact.registries
    this.properties = contact.properties
    if (contact.validations) {
      this.validations = contact.validations.map(
        d => new ContactValidation(d)
      ).sort((a, b) => a.category.localeCompare(b.category))
    }
  }
}
