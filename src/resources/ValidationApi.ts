import Base from '@/resources/Base.ts'
import { ValidationCategoryListParams } from '@/models/ListParams.ts'
import { CancelToken } from 'axios'
import Page from '@/models/Page.ts'
import ValidationCategory, { IValidationCategory, ValidationCategoryField } from '@/models/ValidationCategory.ts'

export default class ValidationApi extends Base {
  async get (categoryName: string, fields?: ValidationCategoryField[]): Promise<ValidationCategory> {
    return this.axios.get(`/validation/categories/${categoryName}`, { params: { fields } })
      .then(response => new ValidationCategory(response.data))
  }

  async list (params?: ValidationCategoryListParams, cancelToken?: CancelToken): Promise<Page<ValidationCategory>> {
    return this.axios.get('/validation/categories/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: ValidationCategory[] = (response.data.entities || []).map((data: IValidationCategory) => new ValidationCategory(data))
        return new Page<ValidationCategory>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }
}