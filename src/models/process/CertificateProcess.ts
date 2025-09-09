import { DcvType } from '@/models/Certificate.ts'
import { ProcessResponse, type IProcessResponse } from '@/models/process/ProcessResponse.ts'
import { AxiosResponse } from 'axios'

export const CertificateRequestValidationStatuses = {
  WAITING: 'WAITING',
  ATTENTION: 'ATTENTION',
  VALIDATED: 'VALIDATED'
} as const

export type CertificateRequestValidationStatus = keyof typeof CertificateRequestValidationStatuses

export const CAARecordStatuses = {
  UNKNOWN: {
    name: 'Unknown',
    status: 'WAITING'
  },
  VALID: {
    name: 'Valid',
    status: 'VALIDATED'
  },
  INVALID: {
    name: 'Invalid',
    status: 'ATTENTION'
  },
  WAITING: {
    name: 'Waiting',
    status: 'WAITING'
  },
  EMPTY: {
    name: 'Empty',
    status: 'VALIDATED'
  },
  TIMEOUT: {
    name: 'Timeout',
    status: 'ATTENTION'
  },
  UNRECOGNIZED_CRITICAL_TAG: {
    name: 'Unrecognized critical tag',
    status: 'ATTENTION'
  },
  MALFORMED_RESPONSE: {
    name: 'Malformed response',
    status: 'ATTENTION'
  }
} as const

export type CAARecordStatus = keyof typeof CAARecordStatuses

export const RiskStatuses = {
  PASSED: 'PASSED',
  WAITING: 'WAITING',
  FAILED: 'FAILED'
}
export type RiskStatus = keyof typeof RiskStatuses;

export interface ICertificateRequestValidationDCV {
  caaRecordStatus: CAARecordStatus;
  riskStatus?: RiskStatus;
  commonName: string
  type: DcvType
  email?: string
  status: CertificateRequestValidationStatus
  dnsRecord?: string
  dnsType?: string
  dnsContents?: string
  fileLocation?: string
  fileContents?: string
}

export interface ICertificateRequestValidation {
  organization?: CertificateRequestValidationStatus
  agreement?: CertificateRequestValidationStatus
  docs?: CertificateRequestValidationStatus
  voice?: CertificateRequestValidationStatus
  whois?: CertificateRequestValidationStatus
  dcv?: ICertificateRequestValidationDCV[]
}

export enum CertificateRequestNoteType {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING'
}

export interface ICertificateRequestNote {
  createdDate: Date
  type: CertificateRequestNoteType
  message: string
}

export interface ICertificateProcessResponse extends IProcessResponse {
  commonName?: string
  requiresAttention?: boolean
  validations?: ICertificateRequestValidation
  notes?: ICertificateRequestNote[],
  oneTimeLink?: string
}

export class CertificateRequestValidationDCV implements ICertificateRequestValidationDCV {
  commonName: string
  type: DcvType
  email?: string
  status: CertificateRequestValidationStatus
  dnsRecord?: string
  dnsType?: string
  dnsContents?: string
  fileLocation?: string
  fileContents?: string
  caaRecordStatus: CAARecordStatus
  riskStatus?: RiskStatus

  constructor (dcv: ICertificateRequestValidationDCV) {
    this.commonName = dcv.commonName
    this.type = dcv.type
    this.email = dcv.email
    this.status = dcv.status
    this.dnsRecord = dcv.dnsRecord
    this.dnsType = dcv.dnsType
    this.dnsContents = dcv.dnsContents
    this.fileLocation = dcv.fileLocation
    this.fileContents = dcv.fileContents
    this.caaRecordStatus = dcv.caaRecordStatus
    this.riskStatus = dcv.riskStatus
  }
}

export class CertificateRequestValidation implements ICertificateRequestValidation {
  organization?: CertificateRequestValidationStatus
  docs?: CertificateRequestValidationStatus
  voice?: CertificateRequestValidationStatus
  whois?: CertificateRequestValidationStatus
  agreement?: CertificateRequestValidationStatus
  dcv?: CertificateRequestValidationDCV[]

  constructor (validation: ICertificateRequestValidation) {
    this.organization = validation.organization
    this.docs = validation.docs
    this.voice = validation.voice
    this.whois = validation.whois
    this.agreement = validation.agreement
    if (validation.dcv) {
      this.dcv = validation.dcv.map(v => new CertificateRequestValidationDCV(v))
    }
  }
}

export class CertificateRequestNote implements ICertificateRequestNote {
  createdDate: Date
  type: CertificateRequestNoteType
  message: string

  constructor (note: ICertificateRequestNote) {
    this.createdDate = note.createdDate ? new Date(note.createdDate) : note.createdDate
    this.type = note.type
    this.message = note.message
  }
}

export class CertificateProcessResponse extends ProcessResponse implements ICertificateProcessResponse {
  // @todo undo this after backend change
  commonName?: string
  requiresAttention?: boolean
  validations?: CertificateRequestValidation
  notes?: CertificateRequestNote[]
  oneTimeLink?: string

  constructor (info: ICertificateProcessResponse, response?: AxiosResponse) {
    super(response)
    this.commonName = info.commonName
    this.requiresAttention = info.requiresAttention
    this.oneTimeLink = info.oneTimeLink
    if (info.validations) {
      this.validations = new CertificateRequestValidation(info.validations)
    }
    if (info.notes) {
      this.notes = info.notes.map(n => new CertificateRequestNote(n))
    }
  }
}
