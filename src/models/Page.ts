import Pagination from '@/models/Pagination'

export default class Page<T> {
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
