import Base from '@/resources/Base'
import { ProcessListParams } from '@/models/ListParams'
import Page from '@/models/Page'
import Process, { IProcess, ProcessField } from '@/models/Process'
import { CertificateProcessResponse } from '@/models/ProcessResponse'
import { CancelToken } from 'axios'

export default class ProcessApi extends Base {
  async get (process: IProcess | number, fields?: ProcessField[]): Promise<Process> {
    return this.axios.get('/processes/' + ((process as IProcess).id || process), { params: { fields } })
      .then(response => new Process(response.data))
  }

  async info (process: IProcess | number): Promise<CertificateProcessResponse> {
    return this.axios.get('/processes/' + ((process as IProcess).id || process) + '/info')
      // TODO type mapping for other types
      .then(response => new CertificateProcessResponse(response.data))
  }

  async cancel (process: IProcess | number): Promise<void> {
    return this.axios.delete('/processes/' + ((process as IProcess).id || process), {})
  }

  async resend (process: IProcess | number): Promise<void> {
    return this.axios.post('/processes/' + ((process as IProcess).id || process) + '/resend', {})
  }

  async list (params?: ProcessListParams, cancelToken?: CancelToken): Promise<Page<Process>> {
    return this.axios.get('/processes/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Process[] = (response.data.entities || []).map((data: IProcess) => new Process(data))
        return new Page(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

}
