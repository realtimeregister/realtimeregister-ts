export interface IPagination {
  limit: number
  offset: number
  total?: number
}

export default class Pagination implements IPagination {
  limit: number
  offset: number
  total?: number

  constructor (limit: number, offset: number, total?: number) {
    this.limit = limit
    this.offset = offset
    this.total = total
  }
}
