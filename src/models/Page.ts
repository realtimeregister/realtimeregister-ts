import Pagination from '@/models/Pagination.ts'

export interface IPage<T> {
  entities: T[]
  pagination: Pagination
}

export default class Page<T> implements IPage<T>{
  entities: T[]
  pagination: Pagination

  constructor (entities: T[], limit: number, offset: number, total?: number) {
    this.entities = entities
    this.pagination = {
      limit,
      offset,
      total
    }
  }
}
