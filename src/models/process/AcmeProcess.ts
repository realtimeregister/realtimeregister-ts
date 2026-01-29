import { ProcessResponse } from '@/models/process/ProcessResponse.ts'
import { IAcmeGetCredentialsResponse } from '@/models/AcmeSubscription.ts'

export interface ICreateAcmeSubscriptionProcessData extends IAcmeGetCredentialsResponse {
  /** ID of the subscription */
  id: number
}

export type ICreateAcmeSubscriptionProcessResponse = ProcessResponse<ICreateAcmeSubscriptionProcessData>

export class CreateAcmeSubscriptionProcessResponse extends ProcessResponse<ICreateAcmeSubscriptionProcessData>
  implements ICreateAcmeSubscriptionProcessResponse {}
