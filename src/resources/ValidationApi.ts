import Base from '@/resources/Base.ts'
import { ValidationCategoryListParams } from '@/models/ListParams.ts'
import { CancelToken } from 'axios'
import Page from '@/models/Page.ts'
import ValidationCategory, { IValidationCategory, ValidationCategoryField } from '@/models/ValidationCategory.ts'

export default class ValidationApi extends Base {
  /**
   * Get a validation category.
   * @link https://dm.realtimeregister.com/docs/api/validation/get
   * @param categoryName - Name of the validation category to get.
   * @param fields - Fields to include in the response.
   */
  async get (categoryName: string, fields?: ValidationCategoryField[]): Promise<ValidationCategory> {
    return this.axios.get(`/validation/categories/${categoryName}`, { params: { fields } })
      .then(response => new ValidationCategory(response.data))
  }

  /**
   * List and search validation categories based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/validation/list
   * @see ValidationCategoryListParams
   * @param params - Object containing parameters passed to the listing, see ValidationCategoryListParams.
   * @param cancelToken
   */
  async list (params?: ValidationCategoryListParams, cancelToken?: CancelToken): Promise<Page<ValidationCategory>> {
    return this.axios.get('/validation/categories/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: ValidationCategory[] = (response.data.entities || []).map((data: IValidationCategory) => new ValidationCategory(data))
        return new Page<ValidationCategory>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }
}