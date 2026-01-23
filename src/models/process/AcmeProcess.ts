import { ProcessResponse } from '@/models/process/ProcessResponse.ts'

export interface ICreateAcmeSubscriptionProcessData {
  directoryUrl: string
  accountKey: string
  hmacKey: string
}

export type ICreateAcmeSubscriptionProcessResponse = ProcessResponse<ICreateAcmeSubscriptionProcessData>

export class CreateAcmeSubscriptionProcessResponse extends ProcessResponse<ICreateAcmeSubscriptionProcessData>
  implements ICreateAcmeSubscriptionProcessResponse {}
