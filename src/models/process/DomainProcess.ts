import { DomainStatusEnum } from '@/models/Domain.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'

export interface IDomainCreateProcessResponse {
  domainName: string
  expiryDate?: Date
  status?: DomainStatusEnum
}
export type IDomainUpdateProcessResponse = IDomainCreateProcessResponse

export interface IDomainTransferProcessResponse {
  domainName: string
  expiryDate?: Date
  status?: DomainStatusEnum
}

export interface IDomainRenewProcessResponse {
  domainName: string
  expiryDate?: Date
}
export type IDomainRestoreProcessResponse = IDomainRenewProcessResponse

/** An alias for ProcessResponse<IDomainRenewProcessResponse> */
export class DomainRenewProcessResponse extends ProcessResponse<IDomainRenewProcessResponse> {}
/** An alias for ProcessResponse<IDomainRestoreProcessResponse> */
export class DomainRestoreProcessResponse extends ProcessResponse<IDomainRestoreProcessResponse> {}
/** An alias for ProcessResponse<IDomainCreateProcessResponse> */
export class DomainCreateProcessResponse extends ProcessResponse<IDomainCreateProcessResponse> {}
/** An alias for ProcessResponse<IDomainUpdateProcessResponse> */
export class DomainUpdateProcessResponse extends ProcessResponse<IDomainUpdateProcessResponse> {}
/** An alias for ProcessResponse<IDomainTransferProcessResponse> */
export class DomainTransferProcessResponse extends ProcessResponse<IDomainTransferProcessResponse> {}
