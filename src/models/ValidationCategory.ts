export interface IValidationCategoryTerms {
  id: number
  version: number
  validUntil: Date
  terms: string
}

export interface IValidationCategory {
  id: number
  name: string
  description: string
  fields: string[]
  terms: IValidationCategoryTerms[]
}
