import Base from '@/resources/Base.ts'
import {
  ProviderDownTimeWindowListParams,
  ProviderListParams,
  RegistryAccountListParams
} from '@/models/ListParams.ts'
import Page, { IPage } from '@/models/Page.ts'
import {
  ProviderDowntimeWindow,
  Provider,
  IProvider,
  IProviderDowntimeWindow,
  ProviderDowntimeWindowField
} from '@/models/Provider.ts'
import { CancelToken } from 'axios'
import { IRegistryAccount, RegistryAccount, RegistryAccountField } from '@/models/Gateway.ts'

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

  /**
   * Get a registry account (Gateway only).
   * @link https://dm.realtimeregister.com/docs/api/registryAccount/get
   * @see RegistryAccountField
   * @param registry - Name of the registry to get the account for.
   * @param loginName - Login name of the account.
   * @param fields - Fields to include in the response, see RegistryAccountField.
   * @gateway
   */
  async getRegistryAccount (registry: string, loginName: string, fields?: RegistryAccountField[]): Promise<RegistryAccount> {
    return this.axios.get<IRegistryAccount>(`/registryAccounts/${registry}/${loginName}`, { params: { fields } }).then(
      response => new RegistryAccount(response.data)
    )
  }

  /**
   * List registry accounts (Gateway only).
   * @link https://dm.realtimeregister.com/docs/api/registryAccount/list
   * @see RegistryAccountListParams
   * @param params - Object containing parameters passed to the listing, see RegistryAccountListParams.
   * @param cancelToken
   * @gateway
   */
  async listRegistryAccounts (params?: RegistryAccountListParams, cancelToken?: CancelToken): Promise<Page<RegistryAccount>> {
    return this.axios.get<IPage<IRegistryAccount>>('/registryAccounts', { params: this.listParamsToUrlParams(params), cancelToken })
      .then(response => {
        const entities: RegistryAccount[] = response.data.entities.map(e => new RegistryAccount(e))
        return new Page<RegistryAccount>(
          entities,
          response.data.pagination.limit,
          response.data.pagination.offset,
          response.data.pagination.total
        )
      })
  }

}
