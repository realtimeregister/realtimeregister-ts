import Base from '@/resources/Base.ts'
import { ProviderDownTimeWindowListParams, ProviderListParams } from '@/models/ListParams.ts'
import Page from '@/models/Page.ts'
import { ProviderDowntimeWindow, Provider, IProvider, IProviderDowntimeWindow } from '@/models/Provider.ts'
import { CancelToken } from 'axios'

export default class ProviderApi extends Base {

  async list (params?: ProviderListParams, cancelToken?: CancelToken): Promise<Page<Provider>> {
    return this.axios.get('/providers/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Provider[] = (response.data.entities || []).map((data: IProvider) => new Provider(data))
        return new Page<Provider>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async listDowntimeWindows (params?: ProviderDownTimeWindowListParams, cancelToken?: CancelToken): Promise<Page<ProviderDowntimeWindow>> {
    return this.axios.get('/providers/downtime', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: ProviderDowntimeWindow[] = (response.data.entities || []).map((data: IProviderDowntimeWindow) => new ProviderDowntimeWindow(data))
        return new Page<ProviderDowntimeWindow>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

}
