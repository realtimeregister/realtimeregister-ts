import { IAcmeGetCredentialsResponse } from '@/models/AcmeSubscription.ts'

export interface ICreateAcmeSubscriptionProcessData extends IAcmeGetCredentialsResponse {
  /** ID of the subscription */
  id: number
}
