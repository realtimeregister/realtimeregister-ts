import Base from '@/resources/Base'
import ListParams from '@/models/ListParams'
import Page from '@/models/Page'
import Host, { IHost, IHostUpdate, IHostCreate } from '@/models/Host'
import { ProcessResponse } from '@/models/ProcessResponse'
import { CancelToken } from 'axios'

export default class HostApi extends Base {
  async get (hostName: IHost | string, fields?: string[]): Promise<Host> {
    return this.axios.get('/hosts/' + ((hostName as IHost).hostName || hostName), { params: { fields } })
      .then(response => new Host(response.data))
  }

  async list (params?: ListParams, cancelToken?: CancelToken): Promise<Page<Host>> {
    return this.axios.get('/hosts/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Host[] = (response.data.entities || []).map((data: IHost) => new Host(data))
        return new Page<Host>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async create (host: IHostCreate): Promise<ProcessResponse> {
    const fields = (({ addresses }) => ({ addresses }))(host)

    return this.axios.post('/hosts/' + host.hostName, fields)
      .then(response => new ProcessResponse(response))
  }

  async update (host: IHostUpdate): Promise<ProcessResponse> {
    const fields = (({ addresses }) => ({ addresses }))(host)

    return this.axios.post('/hosts/' + host.hostName + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  async delete (hostName: IHost | string): Promise<ProcessResponse> {
    return this.axios.delete('/hosts/' + ((hostName as IHost).hostName || hostName))
      .then(response => new ProcessResponse(response))
  }
}
