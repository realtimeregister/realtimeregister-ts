import { describe, expect, it } from 'vitest'
import staticAxios from 'axios'
import Base from '@/resources/Base.ts'
import type { ListParamsBase } from '@/models/ListParams.ts'

describe('Base', () => {
  const axios = staticAxios.create({})
  // Instantiate a new class that extends Base.
  class TestClass extends Base {}

  it('listParamsToUrlParams shouldn\'t manipulate basic properties', () => {
    const base = new TestClass(axios, 'test')
    const listParams: ListParamsBase = {
      fields: ['test1', 'test2'],
      offset: 10,
      order: ['-test1'],
      total: true,
      limit: 15,
      filters: []
    }
    const result = base.listParamsToUrlParams(listParams)
    expect(result).toHaveProperty('fields', [ 'test1', 'test2' ])
    expect(result).toHaveProperty('offset', 10)
    expect(result).toHaveProperty('order', [ '-test1' ])
    expect(result).toHaveProperty('total', true)
    expect(result).toHaveProperty('limit', 15)
  })

  it('listParamsToUrlParams should properly convert filter params', () => {
      const base = new TestClass(axios, 'test')
      const listParams: ListParamsBase = {
        filters: [
          { field: 'name', matcher: 'in', value: ['test1', 'test2']  },
          { field: 'firstName', matcher: 'eq', value: 'test3' },
          { field: 'lastName', matcher: 'ne', value: 'test3' },
          { field: 'test_4', matcher: 'gte', value: '5' },
        ]
      }
      const result = base.listParamsToUrlParams(listParams)
      expect(result).toHaveProperty('name:in', 'test1,test2')
      expect(result).toHaveProperty('firstName', 'test3')
      expect(result).toHaveProperty('lastName:ne', 'test3')
      expect(result).toHaveProperty('test_4:gte', '5')
  })

})

