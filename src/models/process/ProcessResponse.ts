import { AxiosResponse } from 'axios'

export interface IProcessResponse<T = any> {
  id?: number
  status?: number
  data?: T
}

export class ProcessResponse<T = any> implements IProcessResponse {
  id?: number
  status?: number
  data?: T

  constructor (response?: AxiosResponse<T>) {
    this.id = response ? parseInt(response.headers['x-process-id']) : undefined
    this.status = response ? response.status : undefined
    this.data = response ? response.data : undefined
  }
}
