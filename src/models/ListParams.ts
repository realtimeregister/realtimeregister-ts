export interface ListFilter {
  field: string
  matcher?: string
  value: string | string[]
}

export default interface ListParams {
  limit?: number
  offset?: number
  order?: string[]
  total?: boolean
  q?: string
  fields?: string[]

  filters: ListFilter[]
}
