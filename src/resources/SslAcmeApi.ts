import Base from '@/resources/Base.ts'
import AcmeSubscription, {
  AcmeCredentials,
  AcmeSubscriptionField, IAcmeGetCredentialsResponse,
  IAcmeSubscription,
  IAcmeSubscriptionCreate,
  IAcmeSubscriptionRenew,
  IAcmeSubscriptionUpdate
} from '@/models/AcmeSubscription.ts'
import Page, { IPage } from '@/models/Page.ts'
import type { AcmeSubscriptionListParams } from '@/models/ListParams.ts'
import { CancelToken } from 'axios'
import Quote from '@/models/Quote.ts'
import {
  CreateAcmeSubscriptionProcessResponse
} from '@/models/process/AcmeProcess.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'

/**
 * Api for Subscription-based SSL via ACME protocol.
 * @link https://dm.realtimeregister.com/docs/api/ssl/acme
 */
export default class SslAcmeApi extends Base {

  /**
   * Get information about an ACME subscription.
   * @link https://dm.realtimeregister.com/docs/api/ssl/acme/get
   * @param acmeSubscriptionId - ID of the subscription to get.
   * @param fields - Fields to include in the response, see AcmeSubscriptionField.
   * @see AcmeSubscriptionField
   */
  async get(acmeSubscriptionId: number, fields?: AcmeSubscriptionField[]): Promise<AcmeSubscription> {
    return this.axios.get<IAcmeSubscription>(`/ssl/acme/${acmeSubscriptionId}`, { params: { fields } })
      .then(response => new AcmeSubscription(response.data))
  }

  /**
   * List and search ACME subscriptions based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/ssl/acme/list
   * @param params - Object containing parameters passed to the listing, see AcmeSubscriptionListParams.
   * @param cancelToken
   * @see AcmeSubscriptionListParams
   */
  async list(params?: AcmeSubscriptionListParams, cancelToken?: CancelToken): Promise<Page<AcmeSubscription>> {
    return this.axios.get<IPage<IAcmeSubscription>>('/ssl/acme', {
      params: this.listParamsToUrlParams(params), ...cancelToken
    }).then(response => {
        const entities: AcmeSubscription[] = response.data.entities.map(e => new AcmeSubscription(e))
        const { limit, offset, total } = response.data.pagination
        return new Page<AcmeSubscription>(entities, limit, offset, total)
      })
  }

  /**
   * Create an ACME subscription.
   * @link https://dm.realtimeregister.com/docs/api/ssl/acme/create
   * @param data - Data for the new subscription.
   * @param quote - If true, a Quote object will be returned. The subscription will not be created.
   * @see IAcmeSubscriptionCreate
   * @see Quote
   */
  async create (data: IAcmeSubscriptionCreate, quote?: boolean): Promise<CreateAcmeSubscriptionProcessResponse | Quote> {
    const fields = (({
      autoRenew,
      address,
      approver,
      certValidity,
      country,
      city,
      customer,
      domainNames,
      organization,
      postalCode,
      period,
      product,
      state
    }: IAcmeSubscriptionCreate): IAcmeSubscriptionCreate => ({
      autoRenew,
      address,
      approver,
      certValidity,
      country,
      city,
      customer,
      domainNames,
      organization,
      postalCode,
      period,
      product,
      state
    }))(data)

    return this.axios.post('/ssl/acme', fields, { params: quote ? { quote: true } : undefined })
      .then(response => {
        return quote ? new Quote(response.data.quote) : new CreateAcmeSubscriptionProcessResponse(response)
      })
  }

  /**
   * Update an existing ACME subscription.
   * @link https://dm.realtimeregister.com/docs/api/ssl/acme/update
   * @param data - Data for the subscription to update.
   * @param quote - If true, a Quote object will be returned. The subscription will not be updated.
   * @see IAcmeSubscriptionUpdate
   * @see Quote
   */
  async update (data: IAcmeSubscriptionUpdate, quote?: boolean): Promise<Quote | ProcessResponse> {
    const fields = (({
      address,
      approver,
      autoRenew,
      country,
      domainNames,
      state,
      city,
      organization,
      period,
      postalCode
   }: IAcmeSubscriptionUpdate): Partial<IAcmeSubscriptionUpdate> => ({
      address,
      approver,
      autoRenew,
      country,
      domainNames,
      state,
      city,
      period,
      organization,
      postalCode
    }))(data)

    return this.axios.post(`/ssl/acme/${data.id}/update`, fields, { params: quote ? { quote: true } : undefined })
      .then(response => {
        return quote ? new Quote(response.data.quote) : new ProcessResponse(response)
      })
  }

  /**
   * Renew an existing ACME subscription.
   * @link https://dm.realtimeregister.com/docs/api/ssl/acme/renew
   * @param data - Renewal data, see IAcmeSubscriptionRenew.
   * @param quote - If true, a Quote object will be returned. The subscription will not be renewed.
   * @see IAcmeSubscriptionRenew
   * @see Quote
   */
  async renew (data: IAcmeSubscriptionRenew, quote?: boolean): Promise<Quote | ProcessResponse> {
    return this.axios.post(`/ssl/acme/${data.id}/renew`,
      { period: data.period },
      { params: quote ? { quote: true } : undefined }
    ).then(response => quote ? new Quote(response.data.quote) : new ProcessResponse(response))
  }

  /**
   * Delete an existing ACME subscription.
   * @link https://dm.realtimeregister.com/docs/api/ssl/acme/delete
   * @param acmeSubscriptionId - ID of the subscription to delete.
   * @see ProcessResponse
   */
  async delete (acmeSubscriptionId: number): Promise<ProcessResponse> {
    return this.axios.delete(`/ssl/acme/${acmeSubscriptionId}`)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Retrieve ACME subscription credentials in case they are lost. For Sectigo, existing credentials are returned
   * for other brands, the credentials are recreated, and the old ones are invalidated.
   * @link https://dm.realtimeregister.com/docs/api/ssl/acme/credentials
   * @param acmeSubscriptionId - ID of the subscription to get credentials for.
   * @see AcmeCredentials
   */
  async getCredentials (acmeSubscriptionId: number): Promise<AcmeCredentials> {
    return this.axios.post<IAcmeGetCredentialsResponse>(`/ssl/acme/${acmeSubscriptionId}/credentials`).then(
      response => new AcmeCredentials(response.data)
    )
  }

}