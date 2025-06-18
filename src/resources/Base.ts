import ListParams, { ListFilter } from '@/models/ListParams'
import { AxiosInstance } from 'axios'

export default abstract class Base {
  axios: AxiosInstance
  customer: string | undefined

  constructor (axios: AxiosInstance, customer?: string) {
    this.axios = axios
    this.customer = customer
  }

  listParamsToUrlParams (listParams?: ListParams): object {
    if (listParams === undefined) {
      return {}
    }

    const params = {
      limit: listParams.limit,
      offset: listParams.offset,
      order: listParams.order,
      total: listParams.total,
      q: listParams.q,
      fields: listParams.fields
    } as const
    
    if (!listParams.filters) return params
    
    return listParams.filters.reduce((acc: Record<string, any>, filter: ListFilter) => {
        let param = filter.field

        if (filter.matcher !== undefined) {
          if (filter.matcher !== 'eq') {
            param = param + ':' + filter.matcher
          }
          if (filter.matcher === 'in' && filter.value instanceof Array) {
            filter.value = filter.value.join(',')
          }
        }

        if (param in acc) {
          if (acc[param] instanceof Array) {
            acc[param].push(filter.value)
          } else {
            acc[param] = [acc[param], filter.value]
          }
        } else {
          acc[param] = filter.value
        }

        return acc
      }, { ...params })
    }
}
