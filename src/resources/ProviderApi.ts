import Base from '@/resources/Base.ts'
import { ProviderDownTimeWindowListParams, ProviderListParams } from '@/models/ListParams.ts'
import Page from '@/models/Page.ts'
import {
  ProviderDowntimeWindow,
  Provider,
  IProvider,
  IProviderDowntimeWindow,
  ProviderDowntimeWindowField
} from '@/models/Provider.ts'
import { CancelToken } from 'axios'

export default class ProviderApi extends Base {

  /**
   * List and search providers based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/providers/list
   * @see ProviderListParams
   * @param params - Object containing parameters passed to the listing, see ProviderListParams.
   * @param cancelToken
   */
  async list (params?: ProviderListParams, cancelToken?: CancelToken): Promise<Page<Provider>> {
    return this.axios.get('/providers/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Provider[] = (response.data.entities || []).map((data: IProvider) => new Provider(data))
        return new Page<Provider>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * List downtime windows for providers based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/providers/downtime/list
   * @see ProviderDownTimeWindowListParams
   * @param params - Object containing parameters passed to the listing, see ProviderDownTimeWindowListParams.
   * @param cancelToken
   */
  async listDowntimeWindows (params?: ProviderDownTimeWindowListParams, cancelToken?: CancelToken): Promise<Page<ProviderDowntimeWindow>> {
    return this.axios.get('/providers/downtime', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: ProviderDowntimeWindow[] = (response.data.entities || []).map((data: IProviderDowntimeWindow) => new ProviderDowntimeWindow(data))
        return new Page<ProviderDowntimeWindow>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Get a provider downtime window
   * @link https://dm.realtimeregister.com/docs/api/providers/downtime/get
   * @param downtimeId - ID of the downtime window to get.
   * @param fields - Fields to include in the response, see ProviderDowntimeWindowField
   * @see ProviderDowntimeWindowField
   * @see listDowntimeWindows
   */
  async getDowntimeWindow (downtimeId: number, fields?: ProviderDowntimeWindowField[]): Promise<ProviderDowntimeWindow> {
    return this.axios.get<IProviderDowntimeWindow>('/providers/downtime/' + downtimeId, { params: { fields } })
      .then(response => new ProviderDowntimeWindow(response.data))
  }

}
