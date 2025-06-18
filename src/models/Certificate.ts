import { CertificateType, ValidationType } from '@/models/SslProduct'

export enum PublicKeyAlgorithm {
  RSA = 'RSA',
  ECDSA = 'ECDSA'
}

export enum DcvType {
  EMAIL = 'EMAIL',
  FILE = 'FILE',
  DNS = 'DNS'
}

export enum Language {
  EN = 'EN',
  NL = 'NL',
  FR = 'FR',
  DE = 'DE'
}

export enum certificateStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  REISSUED = 'REISSUED',
  RENEWED = 'RENEWED'
}

export interface IDcv {
  commonName: string,
  type: DcvType,
  email: string
}

export interface IApprover {
  firstName: string,
  lastName: string,
  jobTitle?: string,
  email: string,
  voice: string
}

export interface ICertificateRevoke {
  reason: string
}

export interface ICertificate {
  id: number
  domainName: string
  validationType: ValidationType
  certificateType: CertificateType
  product: string
  organization?: string
  department: string
  providerId?: string
  postalCode?: string
  addressLine?: string[]
  city?: string
  state?: string
  country?: string
  startDate: Date
  expiryDate: Date
  subscriptionEndDate?: Date
  contact?: string
  coc?: string
  san?: string[]
  status: certificateStatus
  publicKeyAlgorithm?: PublicKeyAlgorithm
  publicKeySize?: number
  process?: number
  csr?: string
  certificate?: string
  fingerprint?: string
}

export interface ICertificateRequest {
  product: string
  period: number
  csr: string
  domainName?: string
  san?: string[]
  organization?: string
  department?: string
  address?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  language?: Language
  coc?: string
  saEmail?: string
  approver?: IApprover,
  dcv?: IDcv[]
  authKey?: boolean
}

export interface ICertificateRenew {
  period: number
  csr: string
  domainName?: string
  san?: string[]
  organization?: string
  department?: string
  address?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  language?: Language
  coc?: string
  saEmail?: string
  approver?: IApprover
  dcv?: IDcv[]
  product: string
  authKey?: boolean
}

export interface ICertificateReissue {
  csr: string
  domainName?: string
  san?: string[]
  organization?: string
  department?: string
  address?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  language?: Language
  coc?: string
  saEmail?: string
  approver?: IApprover
  dcv?: IDcv[]
  authKey?: boolean
}

export interface ICertificateImport {
  certificate: string
  csr?: string
  coc?: string,
  domainName?: string
}

export interface IResendDcv {
  dcv: IDcv[]
}

export interface IAddNote {
  message: string
}

export interface IScheduleValidationCall {
  date: Date
}

export interface ISubscriberAgreement {
  email: string
  language?: Language
}

export interface ICsrDecode {
  csr: string
}

export interface ICsrInfo {
  subject: string
  country: string
  state: string
  locality: string
  organization: string
  organizationalUnit: string
  commonName: string
  publicKeyAlgorithm: PublicKeyAlgorithm
  publicKeySize: number
  street?: string[]
  postalCode?: string
  postalOfficeBox?: string
  emailAddress?: string,
  altNames?: string[]
}

export class CsrInfo implements ICsrInfo {
  subject: string
  country: string
  state: string
  locality: string
  organization: string
  organizationalUnit: string
  commonName: string
  publicKeyAlgorithm: PublicKeyAlgorithm
  publicKeySize: number
  street?: string[]
  postalCode?: string
  postalOfficeBox?: string
  emailAddress?: string
  altNames?: string[]

  constructor (response: ICsrInfo) {
    this.subject = response.subject
    this.country = response.country
    this.state = response.state
    this.locality = response.locality
    this.organization = response.organization
    this.organizationalUnit = response.organizationalUnit
    this.commonName = response.commonName
    this.publicKeyAlgorithm = response.publicKeyAlgorithm
    this.publicKeySize = response.publicKeySize
    this.street = response.street
    this.postalCode = response.postalCode
    this.postalOfficeBox = response.postalOfficeBox
    this.emailAddress = response.emailAddress
    this.altNames = response.altNames
  }
}

export default class Certificate implements ICertificate {
  id: number
  domainName: string
  validationType: ValidationType
  certificateType: CertificateType
  product: string
  organization?: string
  department: string
  providerId?: string
  postalCode?: string
  addressLine?: string[]
  city?: string
  state?: string
  country?: string
  startDate: Date
  expiryDate: Date
  subscriptionEndDate?: Date
  contact?: string
  coc?: string
  san?: string[]
  status: certificateStatus
  publicKeyAlgorithm?: PublicKeyAlgorithm
  publicKeySize?: number
  process?: number
  csr?: string
  certificate?: string
  fingerprint?: string

  constructor (cert: ICertificate) {
    this.id = cert.id
    this.domainName = cert.domainName
    this.validationType = cert.validationType
    this.certificateType = cert.certificateType
    this.product = cert.product
    this.organization = cert.organization
    this.department = cert.department
    this.providerId = cert.providerId
    this.postalCode = cert.postalCode
    this.addressLine = cert.addressLine
    this.city = cert.city
    this.state = cert.state
    this.country = cert.country
    this.startDate = cert.startDate ? new Date(cert.startDate) : cert.startDate
    this.expiryDate = cert.expiryDate ? new Date(cert.expiryDate) : cert.expiryDate
    this.subscriptionEndDate = cert.subscriptionEndDate ? new Date(cert.subscriptionEndDate) : cert.subscriptionEndDate
    this.contact = cert.contact
    this.coc = cert.coc
    this.san = cert.san
    this.status = cert.status
    this.publicKeyAlgorithm = cert.publicKeyAlgorithm
    this.publicKeySize = cert.publicKeySize
    this.process = cert.process
    this.csr = cert.csr
    this.certificate = cert.certificate
    this.fingerprint = cert.fingerprint
  }
}
