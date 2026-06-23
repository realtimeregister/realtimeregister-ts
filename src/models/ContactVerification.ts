export const VerificationMethods = {
  REACHABILITY: 'REACHABILITY',
  ELECTRONIC_DOCUMENT: 'ELECTRONIC_DOCUMENT',
  PHYSICAL_DOCUMENT: 'PHYSICAL_DOCUMENT',
  EID_AUTH: 'EID_AUTH',
  TRANSACTION: 'TRANSACTION',
  DATA: 'DATA'
} as const
export type VerificationMethod = keyof typeof VerificationMethods

export const VerificationProofs = {
  LOG_RECORD: 'LOG_RECORD',
  ID_CARD: 'ID_CARD',
  PASSPORT: 'PASSPORT',
  POPULATION_REGISTER: 'POPULATION_REGISTER',
  RESIDENCE_PERMIT: 'RESIDENCE_PERMIT',
  DRIVERS_LICENCE: 'DRIVERS_LICENCE',
  COMPANY_REGISTER: 'COMPANY_REGISTER',
  COMPANY_STATEMENT: 'COMPANY_STATEMENT',
  BANK_ACCOUNT: 'BANK_ACCOUNT',
  ONLINE_PAYMENT_ACCOUNT: 'ONLINE_PAYMENT_ACCOUNT',
  UTILITY_ACCOUNT: 'UTILITY_ACCOUNT',
  BANK_STATEMENT: 'BANK_STATEMENT',
  TAX_STATEMENT: 'TAX_STATEMENT',
  ADDRESS_DATABASE: 'ADDRESS_DATABASE'
} as const
export type VerificationProof = keyof typeof VerificationProofs

export const VerificationClaims = {
  EMAIL: 'EMAIL',
  ADDRESS: 'ADDRESS',
  ORGANIZATION: 'ORGANIZATION',
  NAME: 'NAME',
  VOICE: 'VOICE'
} as const
export type VerificationClaim = keyof typeof VerificationClaims

export interface IContactVerification {
  verificationDate: Date
  method: VerificationMethod
  proof: VerificationProof
  source: string
  externalId: string
  claims: VerificationClaim[]
  createdDate: Date
  updatedDate?: Date
}

export interface IContactVerificationCommand {
  verificationDate: Date
  method: VerificationMethod
  proof: VerificationProof
  externalId: string
  claims: VerificationClaim[]
}

export default class ContactVerification implements IContactVerification {
  verificationDate: Date
  method: VerificationMethod
  proof: VerificationProof
  source: string
  externalId: string
  claims: VerificationClaim[]
  createdDate: Date
  updatedDate?: Date

  constructor (verification: IContactVerification) {
    this.verificationDate = verification.verificationDate ? new Date(verification.verificationDate) : verification.verificationDate
    this.method = verification.method
    this.proof = verification.proof
    this.source = verification.source
    this.externalId = verification.externalId
    this.claims = verification.claims
    this.createdDate = verification.createdDate ? new Date(verification.createdDate) : verification.createdDate
    this.updatedDate = verification.updatedDate ? new Date(verification.updatedDate) : verification.updatedDate
  }
}
