import Base from '@/resources/Base.ts'
import { HostListParams } from '@/models/ListParams.ts'
import Page from '@/models/Page.ts'
import Host, { IHost, IHostUpdate, IHostCreate, HostField } from '@/models/Host.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'
import { CancelToken } from 'axios'

export default class HostApi extends Base {
  /**
   * Get a host.
   * @link https://dm.realtimeregister.com/docs/api/hosts/get
   * @param hostName - Host name, or object.
   * @param fields - Fields to include in the response.
   */
  async get (hostName: IHost | string, fields?: HostField[]): Promise<Host> {
    return this.axios.get('/hosts/' + ((hostName as IHost).hostName || hostName), { params: { fields } })
      .then(response => new Host(response.data))
  }

  /**
   * List hosts available within your account.
   * @link https://dm.realtimeregister.com/docs/api/hosts/list
   * @see HostListParams
   * @param params - Object containing parameters passed to the listing, see HostListParams.
   * @param cancelToken
   */
  async list (params?: HostListParams, cancelToken?: CancelToken): Promise<Page<Host>> {
    return this.axios.get('/hosts/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Host[] = (response.data.entities || []).map((data: IHost) => new Host(data))
        return new Page<Host>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Create a new host.
   * @link https://dm.realtimeregister.com/docs/api/hosts/create
   * @param host - Data for the new host.
   */
  async create (host: IHostCreate): Promise<ProcessResponse> {
    const fields = (({ addresses }) => ({ addresses }))(host)

    return this.axios.post('/hosts/' + host.hostName, fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Update an existing host. Will determine the host to update based on the hostName property.
   * @link https://dm.realtimeregister.com/docs/api/hosts/update
   * @param host - Data for the host to update.
   */
  async update (host: IHostUpdate): Promise<ProcessResponse> {
    const fields = (({ addresses }) => ({ addresses }))(host)

    return this.axios.post('/hosts/' + host.hostName + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Delete an existing host.
   * @link https://dm.realtimeregister.com/docs/api/hosts/delete
   * @param hostName - Name of the host to delete.
   */
  async delete (hostName: IHost | string): Promise<ProcessResponse> {
    return this.axios.delete('/hosts/' + ((hostName as IHost).hostName || hostName))
      .then(response => new ProcessResponse(response))
  }
}
