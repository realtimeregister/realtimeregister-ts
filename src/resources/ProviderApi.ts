import Base from '@/resources/Base'
import ListParams from '@/models/ListParams'
import Page from '@/models/Page'
import { ProviderDowntimeWindow, Provider, IProvider, IProviderDowntimeWindow } from '@/models/Provider'
import { CancelToken } from 'axios'

export default class ProviderApi extends Base {

  async list (params?: ListParams, cancelToken?: CancelToken): Promise<Page<Provider>> {
    return this.axios.get('/providers/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Provider[] = (response.data.entities || []).map((data: IProvider) => new Provider(data))
        return new Page<Provider>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async listDowntimeWindows (params?: ListParams, cancelToken?: CancelToken): Promise<Page<ProviderDowntimeWindow>> {
    return this.axios.get('/providers/downtime', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: ProviderDowntimeWindow[] = (response.data.entities || []).map((data: IProviderDowntimeWindow) => new ProviderDowntimeWindow(data))
        return new Page<ProviderDowntimeWindow>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

}
