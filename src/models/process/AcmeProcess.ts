import { ProcessResponse } from '@/models/process/ProcessResponse.ts'

export interface ICreateAcmeSubscriptionProcessData {
  /** ID of the subscription */
  id: number
  directoryUrl: string
  accountKey: string
  hmacKey: string
}

export type ICreateAcmeSubscriptionProcessResponse = ProcessResponse<ICreateAcmeSubscriptionProcessData>

export class CreateAcmeSubscriptionProcessResponse extends ProcessResponse<ICreateAcmeSubscriptionProcessData>
  implements ICreateAcmeSubscriptionProcessResponse {}
