import Base from '@/resources/Base.ts'
import { ProcessListParams } from '@/models/ListParams.ts'
import Page from '@/models/Page.ts'
import Process, { IProcess, ProcessField } from '@/models/process/Process.ts'
import { CertificateProcessResponse } from '@/models/process/CertificateProcess.ts'
import { CancelToken } from 'axios'

export default class ProcessApi extends Base {
  /**
   * Get a process.
   * @link https://dm.realtimeregister.com/docs/api/processes/get
   * @param process - Process object, or id.
   * @param fields - Fields to include in response.
   */
  async get (process: IProcess | number, fields?: ProcessField[]): Promise<Process> {
    return this.axios.get('/processes/' + ((process as IProcess).id || process), { params: { fields } })
      .then(response => new Process(response.data))
  }

  /**
   * Get context-specific info on a process.
   * @link https://dm.realtimeregister.com/docs/api/processes/info
   * @param process - Process object, or id.
   */
  async info (process: IProcess | number): Promise<CertificateProcessResponse> {
    return this.axios.get('/processes/' + ((process as IProcess).id || process) + '/info')
      // TODO type mapping for other types
      .then(response => new CertificateProcessResponse(response.data))
  }

  /**
   * Cancel a process.
   * @link https://dm.realtimeregister.com/docs/api/processes/cancel
   * @param process - Process object, or id.
   */
  async cancel (process: IProcess | number): Promise<void> {
    return this.axios.delete('/processes/' + ((process as IProcess).id || process), {})
  }

  /**
   * Resend a process
   * @param process - Process object, or id.
   */
  async resend (process: IProcess | number): Promise<void> {
    return this.axios.post('/processes/' + ((process as IProcess).id || process) + '/resend', {})
  }

  /**
   * List processes based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/processes/list
   * @see ProcessListParams
   * @param params
   * @param cancelToken
   */
  async list (params?: ProcessListParams, cancelToken?: CancelToken): Promise<Page<Process>> {
    return this.axios.get('/processes/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Process[] = (response.data.entities || []).map((data: IProcess) => new Process(data))
        return new Page(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

}
